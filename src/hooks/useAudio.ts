'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useTimerStore } from '@/lib/store';
import { getAudioManager, AUDIO_TRACKS } from '@/lib/audio';
import type { SoundID } from '@/lib/store';

export function useAudio() {
  const [mounted, setMounted] = useState(false);
  const audioManagerRef = useRef<ReturnType<typeof getAudioManager> | null>(null);
  const userInteractionRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    // Only initialize audio manager on client side
    audioManagerRef.current = getAudioManager();
  }, []);
  
  const {
    sound,
    volume,
    isRunning,
    isCompleted,
    setSound,
    setVolume,
  } = useTimerStore();

  // Handle user interaction to unlock audio
  const handleUserInteraction = useCallback(async () => {
    if (!userInteractionRef.current && audioManagerRef.current) {
      await audioManagerRef.current.initializeAfterUserInteraction();
      userInteractionRef.current = true;
    }
  }, []);

  // Set up user interaction listeners
  useEffect(() => {
    const events = ['click', 'touchstart', 'keydown'];
    
    const addInteractionListener = () => {
      events.forEach(event => {
        document.addEventListener(event, handleUserInteraction, { once: true });
      });
    };

    addInteractionListener();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [handleUserInteraction]);

  // Update volume when store volume changes
  useEffect(() => {
    if (mounted && audioManagerRef.current) {
      audioManagerRef.current.setVolume(volume);
    }
  }, [volume, mounted]);

  // Handle timer state changes
  useEffect(() => {
    const audioManager = audioManagerRef.current;
    if (!mounted || !audioManager) return;
    
    if (isRunning && sound !== 'none') {
      // Start or resume audio when timer starts
      if (audioManager.getCurrentTrack() === sound) {
        audioManager.resume();
      } else {
        audioManager.playTrack(sound);
      }
    } else {
      // Pause audio when timer pauses or completes
      audioManager.pause();
    }
  }, [isRunning, sound, mounted]);

  // Handle sound changes
  useEffect(() => {
    const audioManager = audioManagerRef.current;
    if (!mounted || !audioManager) return;
    
    if (sound === 'none') {
      audioManager.stop();
    } else if (isRunning && audioManager.getCurrentTrack() !== sound) {
      audioManager.playTrack(sound);
    }
  }, [sound, isRunning, mounted]);

  // Play completion sound effect
  const playCompletionSound = useCallback(() => {
    // Create a simple beep sound using Web Audio API
    if (typeof window === 'undefined') return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800; // 800Hz beep
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      
      // Clean up
      setTimeout(() => {
        try {
          audioContext.close();
        } catch {
          // Ignore cleanup errors
        }
      }, 1000);
    } catch (error) {
      console.warn('Could not play completion sound:', error);
    }
  }, []);

  useEffect(() => {
    if (isCompleted) {
      // Play a simple completion beep
      playCompletionSound();
    }
  }, [isCompleted, playCompletionSound]);

  // Change sound
  const changeSound = useCallback(async (newSound: SoundID) => {
    // Ensure user interaction has occurred
    await handleUserInteraction();
    setSound(newSound);
  }, [setSound, handleUserInteraction]);

  // Change volume
  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, [setVolume]);

  // Get available sounds
  const getAvailableSounds = useCallback(() => {
    return [
      { id: 'none' as SoundID, name: 'Silent' },
      ...AUDIO_TRACKS.map(track => ({ id: track.id, name: track.name }))
    ];
  }, []);

  // Preview sound (play for a few seconds)
  const previewSound = useCallback(async (soundId: SoundID) => {
    if (soundId === 'none' || !mounted) return;
    
    await handleUserInteraction();
    
    const audioManager = audioManagerRef.current;
    if (!audioManager) return;
    
    const currentTrack = audioManager.getCurrentTrack();
    const wasPlaying = audioManager.getIsPlaying();
    
    // Temporarily play the preview sound
    await audioManager.playTrack(soundId);
    
    // Stop after 3 seconds and restore previous state
    setTimeout(async () => {
      await audioManager.stop();
      
      if (wasPlaying && currentTrack && currentTrack !== soundId) {
        await audioManager.playTrack(currentTrack);
      }
    }, 3000);
  }, [handleUserInteraction, mounted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const audioManager = audioManagerRef.current;
      if (audioManager) {
        audioManager.destroy();
      }
    };
  }, []);

  return {
    currentSound: sound,
    currentVolume: volume,
    isPlaying: mounted && isRunning && sound !== 'none',
    availableSounds: getAvailableSounds(),
    changeSound,
    changeVolume,
    previewSound,
  };
}