'use client';

import { useEffect } from 'react';
import { useTimerStore } from '@/lib/store';

// Client-only audio system that initializes after hydration
export function AudioSystemClient() {
  const { sound, volume, isRunning } = useTimerStore();

  useEffect(() => {
    // Only run on client after hydration
    if (typeof window === 'undefined') return;

    let audioManager: ReturnType<typeof import('@/lib/audio').getAudioManager> | null = null;
    let isInitialized = false;

    const initializeAudio = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const { getAudioManager } = await import('@/lib/audio');
        audioManager = getAudioManager();
        isInitialized = true;
        // Audio system initialized
      } catch (error) {
        console.warn('Failed to initialize audio system:', error);
      }
    };

    // Initialize audio system
    initializeAudio();

    return () => {
      if (audioManager && isInitialized) {
        audioManager.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Handle timer state changes
    const handleAudioState = async () => {
      if (typeof window === 'undefined') return;

      try {
        const { getAudioManager } = await import('@/lib/audio');
        const audioManager = getAudioManager();

        if (isRunning && sound !== 'none') {
          // Start or resume audio when timer starts
          if (audioManager.getCurrentTrack() === sound) {
            await audioManager.resume();
          } else {
            await audioManager.playTrack(sound);
          }
        } else {
          // Pause audio when timer pauses or completes
          await audioManager.pause();
        }
      } catch (error) {
        console.warn('Audio operation failed:', error);
      }
    };

    // Small delay to ensure hydration is complete
    const timer = setTimeout(handleAudioState, 100);
    return () => clearTimeout(timer);
  }, [isRunning, sound]);

  useEffect(() => {
    // Handle volume changes
    const handleVolumeChange = async () => {
      if (typeof window === 'undefined') return;

      try {
        const { getAudioManager } = await import('@/lib/audio');
        const audioManager = getAudioManager();
        audioManager.setVolume(volume);
      } catch (error) {
        console.warn('Volume change failed:', error);
      }
    };

    const timer = setTimeout(handleVolumeChange, 100);
    return () => clearTimeout(timer);
  }, [volume]);

  // This component doesn't render anything visible
  return null;
}