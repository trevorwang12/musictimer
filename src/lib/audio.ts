import { SoundID } from './store';

export interface AudioTrack {
  id: SoundID;
  name: string;
  url: string;
  audio?: HTMLAudioElement;
}

// Audio tracks configuration
export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'rain',
    name: 'Rain Sounds',
    url: '/audio/rain.mp3',
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    url: '/audio/ocean-waves.mp3',
  },
  {
    id: 'cafe',
    name: 'Café Ambiance',
    url: '/audio/cafe-ambiance.mp3',
  },
  {
    id: 'white',
    name: 'White Noise',
    url: '/audio/white-noise.mp3',
  },
];

export class AudioManager {
  private currentAudio: HTMLAudioElement | null = null;
  private currentTrack: SoundID | null = null;
  private volume: number = 0.6;
  private isPlaying: boolean = false;
  private fadeInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Delay initialization to avoid hydration issues
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.preloadTracks();
        this.testAudioAccess();
      }, 100);
    }
  }

  private async testAudioAccess() {
    // Testing audio file access
    for (const track of AUDIO_TRACKS) {
      try {
        const response = await fetch(track.url);
        if (response.ok) {
          // Audio file accessible
        } else {
          console.warn(`❌ Audio file not accessible: ${track.name} (${response.status})`);
        }
      } catch (error) {
        console.warn(`❌ Failed to test audio file: ${track.name}`, error);
      }
    }
  }

  private preloadTracks() {
    if (typeof window === 'undefined') return;
    
    AUDIO_TRACKS.forEach(track => {
      const audio = new Audio();
      audio.src = track.url;
      audio.loop = true;
      audio.preload = 'metadata';
      audio.volume = 0;
      
      // Handle loading events
      audio.addEventListener('error', (e) => {
        console.warn(`❌ Failed to load audio track: ${track.name}`, e);
        console.warn(`❌ Error details:`, {
          url: track.url,
          error: audio.error,
          networkState: audio.networkState,
          readyState: audio.readyState
        });
      });
      
      audio.addEventListener('canplaythrough', () => {
        // Audio track loaded
      });
      
      audio.addEventListener('loadstart', () => {
        // Started loading
      });
      
      audio.addEventListener('loadeddata', () => {
        // Data loaded
      });
      
      track.audio = audio;
    });
  }

  async playTrack(trackId: SoundID): Promise<boolean> {
    if (trackId === 'none') {
      await this.stop();
      return true;
    }

    const track = AUDIO_TRACKS.find(t => t.id === trackId);
    if (!track) {
      console.warn(`❌ Audio track not found: ${trackId}`);
      return false;
    }

    // Create fresh audio element if needed
    if (!track.audio) {
      // Creating fresh audio element
      track.audio = new Audio();
      track.audio.src = track.url;
      track.audio.loop = true;
      track.audio.preload = 'metadata';
      track.audio.volume = 0;
      
      // Add event listeners
      track.audio.addEventListener('error', (e) => {
        console.warn(`❌ Failed to load audio track: ${track.name}`, e);
      });
      
      track.audio.addEventListener('canplaythrough', () => {
        // Audio track loaded
      });
    }

    // Stop current audio if different track
    if (this.currentAudio && this.currentTrack !== trackId) {
      await this.stop();
    }

    this.currentAudio = track.audio;
    this.currentTrack = trackId;

    try {
      // Reset audio to beginning if not already playing
      if (this.currentAudio.paused) {
        this.currentAudio.currentTime = 0;
        this.currentAudio.volume = 0;
      }

      // Attempting to play
      const playPromise = this.currentAudio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }

      this.isPlaying = true;
      // Playing
      await this.fadeIn();
      return true;
    } catch (error) {
      console.warn('❌ Failed to play audio:', error);
      
      // Handle autoplay restriction
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        console.warn('🔒 Audio playback blocked by browser - need user interaction');
        return false;
      }
      
      return false;
    }
  }

  async pause(): Promise<void> {
    if (!this.currentAudio || !this.isPlaying) return;

    await this.fadeOut();
    this.currentAudio.pause();
    this.isPlaying = false;
  }

  async resume(): Promise<boolean> {
    if (!this.currentAudio || this.isPlaying) return false;

    try {
      const playPromise = this.currentAudio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }

      this.isPlaying = true;
      await this.fadeIn();
      return true;
    } catch (error) {
      console.warn('Failed to resume audio:', error);
      return false;
    }
  }

  async stop(): Promise<void> {
    if (!this.currentAudio) return;

    await this.fadeOut();
    this.currentAudio.pause();
    this.currentAudio.currentTime = 0;
    this.isPlaying = false;
    this.currentAudio = null;
    this.currentTrack = null;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume / 100));
    
    if (this.currentAudio && this.isPlaying) {
      this.currentAudio.volume = this.volume;
    }
  }

  getCurrentTrack(): SoundID | null {
    return this.currentTrack;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private fadeIn(duration: number = 1000): Promise<void> {
    return new Promise((resolve) => {
      if (!this.currentAudio) {
        resolve();
        return;
      }

      const steps = 20;
      const stepDuration = duration / steps;
      const volumeStep = this.volume / steps;
      let currentStep = 0;

      if (this.fadeInterval) {
        clearInterval(this.fadeInterval);
      }

      this.fadeInterval = setInterval(() => {
        if (!this.currentAudio) {
          if (this.fadeInterval) clearInterval(this.fadeInterval);
          resolve();
          return;
        }

        currentStep++;
        this.currentAudio.volume = volumeStep * currentStep;

        if (currentStep >= steps) {
          if (this.fadeInterval) clearInterval(this.fadeInterval);
          this.currentAudio.volume = this.volume;
          resolve();
        }
      }, stepDuration);
    });
  }

  private fadeOut(duration: number = 500): Promise<void> {
    return new Promise((resolve) => {
      if (!this.currentAudio) {
        resolve();
        return;
      }

      const steps = 10;
      const stepDuration = duration / steps;
      const startVolume = this.currentAudio.volume;
      const volumeStep = startVolume / steps;
      let currentStep = 0;

      if (this.fadeInterval) {
        clearInterval(this.fadeInterval);
      }

      this.fadeInterval = setInterval(() => {
        if (!this.currentAudio) {
          if (this.fadeInterval) clearInterval(this.fadeInterval);
          resolve();
          return;
        }

        currentStep++;
        this.currentAudio.volume = startVolume - (volumeStep * currentStep);

        if (currentStep >= steps || this.currentAudio.volume <= 0) {
          if (this.fadeInterval) clearInterval(this.fadeInterval);
          this.currentAudio.volume = 0;
          resolve();
        }
      }, stepDuration);
    });
  }

  // Handle user interaction requirement for autoplay
  async initializeAfterUserInteraction(): Promise<void> {
    // Try to play and immediately pause a silent audio to unlock audio context
    const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAAAAAAAAAAAAAAAAAAAZGF0YQAAAAA=');
    silentAudio.volume = 0;
    
    try {
      const playPromise = silentAudio.play();
      if (playPromise !== undefined) {
        await playPromise;
        silentAudio.pause();
      }
    } catch {
      // Ignore errors - this is just to unlock audio context
    }
  }

  // Clean up resources
  destroy(): void {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
    }
    
    this.stop();
    
    AUDIO_TRACKS.forEach(track => {
      if (track.audio) {
        track.audio.pause();
        track.audio = undefined;
      }
    });
  }
}

// Singleton instance - avoid creation during SSR
let audioManagerInstance: AudioManager | null = null;

export const getAudioManager = (): AudioManager => {
  // Always return a mock during SSR to prevent hydration issues
  if (typeof window === 'undefined') {
    return new class MockAudioManager {
      playTrack = async () => false;
      pause = async () => {};
      resume = async () => false;
      stop = async () => {};
      setVolume = () => {};
      getCurrentTrack = () => null;
      getIsPlaying = () => false;
      initializeAfterUserInteraction = async () => {};
      destroy = () => {};
      preloadTracks = () => {};
      testAudioAccess = () => {};
      fadeOut = async () => {};
      fadeIn = async () => {};
      resetAudio = () => {};
    } as unknown as AudioManager;
  }
  
  // Only create instance on client and after some delay to ensure hydration is complete
  if (!audioManagerInstance) {
    audioManagerInstance = new AudioManager();
  }
  return audioManagerInstance;
};