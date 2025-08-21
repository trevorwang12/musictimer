'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getAudioManager } from '@/lib/audio';
import type { SoundID } from '@/lib/store';

interface AudioContextType {
  currentTrack: SoundID | null;
  isPlaying: boolean;
  playTrack: (trackId: SoundID) => Promise<boolean>;
  pause: () => Promise<void>;
  resume: () => Promise<boolean>;
  stop: () => Promise<void>;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundID | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const audioManager = mounted ? getAudioManager() : null;

  const playTrack = async (trackId: SoundID): Promise<boolean> => {
    if (!audioManager) return false;
    
    const result = await audioManager.playTrack(trackId);
    setCurrentTrack(audioManager.getCurrentTrack());
    setIsPlaying(audioManager.getIsPlaying());
    return result;
  };

  const pause = async (): Promise<void> => {
    if (!audioManager) return;
    
    await audioManager.pause();
    setIsPlaying(audioManager.getIsPlaying());
  };

  const resume = async (): Promise<boolean> => {
    if (!audioManager) return false;
    
    const result = await audioManager.resume();
    setIsPlaying(audioManager.getIsPlaying());
    return result;
  };

  const stop = async (): Promise<void> => {
    if (!audioManager) return;
    
    await audioManager.stop();
    setCurrentTrack(audioManager.getCurrentTrack());
    setIsPlaying(audioManager.getIsPlaying());
  };

  const setVolume = (volume: number): void => {
    if (!audioManager) return;
    audioManager.setVolume(volume);
  };

  // Don't render context during SSR
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      playTrack,
      pause,
      resume,
      stop,
      setVolume,
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    // Return safe defaults during SSR or when not wrapped
    return {
      currentTrack: null as SoundID | null,
      isPlaying: false,
      playTrack: async () => false,
      pause: async () => {},
      resume: async () => false,
      stop: async () => {},
      setVolume: () => {},
    };
  }
  return context;
}