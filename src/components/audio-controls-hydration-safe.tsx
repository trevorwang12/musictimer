'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Music, 
  VolumeX, 
  Volume1, 
  Volume2, 
  Play, 
  Pause
} from 'lucide-react';
import { useTimerStore } from '@/lib/store';
import type { SoundID } from '@/lib/store';

interface AudioControlsProps {
  compact?: boolean;
  className?: string;
}

const AVAILABLE_SOUNDS = [
  { id: 'none' as SoundID, name: 'Silent' },
  { id: 'rain' as SoundID, name: 'Rain Sounds' },
  { id: 'ocean' as SoundID, name: 'Ocean Waves' },
  { id: 'cafe' as SoundID, name: 'Café Ambiance' },
  { id: 'white' as SoundID, name: 'White Noise' },
];

export function AudioControlsHydrationSafe({ compact = false, className = '' }: AudioControlsProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const {
    sound,
    volume,
    isRunning,
    setSound,
    setVolume,
  } = useTimerStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  const handleSoundSelect = (soundId: SoundID) => {
    setSound(soundId);
  };

  const handlePreview = async (soundId: SoundID) => {
    if (soundId !== 'none' && soundId !== sound && mounted) {
      try {
        const { getAudioManager } = await import('@/lib/audio');
        const audioManager = getAudioManager();
        
        // Preview for 3 seconds
        await audioManager.playTrack(soundId);
        setTimeout(async () => {
          await audioManager.stop();
        }, 3000);
      } catch (error) {
        console.warn('Preview failed:', error);
      }
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0 || sound === 'none') return VolumeX;
    if (volume < 50) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className={className} style={{ minHeight: compact ? '40px' : '200px' }} />;
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-1"
        >
          <Music className="h-4 w-4" />
          <span className="hidden sm:inline">Audio</span>
        </Button>
        
        {showSettings && (
          <Card className="absolute top-full left-0 mt-2 w-80 z-50 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Audio Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Background Sound</label>
                  <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_SOUNDS.map((availableSound) => (
                      <Button
                        key={availableSound.id}
                        variant={sound === availableSound.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSoundSelect(availableSound.id)}
                        className="justify-start text-xs"
                      >
                        {availableSound.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {sound !== 'none' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Volume</label>
                    <div className="flex items-center gap-3">
                      <VolumeIcon className="h-4 w-4 text-muted-foreground" />
                      <Slider
                        value={[volume]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground w-8">
                        {volume}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Music className="h-5 w-5" />
          Background Sound
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sound Selection */}
        <div>
          <label className="text-sm font-medium mb-3 block">Choose Sound</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AVAILABLE_SOUNDS.map((availableSound) => (
              <div key={availableSound.id} className="flex items-center gap-2">
                <Button
                  variant={sound === availableSound.id ? "default" : "outline"}
                  onClick={() => handleSoundSelect(availableSound.id)}
                  className="flex-1 justify-start"
                >
                  {availableSound.name}
                </Button>
                
                {availableSound.id !== 'none' && availableSound.id !== sound && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePreview(availableSound.id)}
                    className="px-2"
                    title="Preview sound"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Volume Control */}
        {sound !== 'none' && (
          <div>
            <label className="text-sm font-medium mb-3 block">Volume</label>
            <div className="flex items-center gap-4">
              <VolumeIcon className="h-5 w-5 text-muted-foreground" />
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-12">
                {volume}%
              </span>
            </div>
          </div>
        )}

        {/* Status Display */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {sound === 'none' ? (
            <>
              <VolumeX className="h-4 w-4" />
              <span>Silent mode</span>
            </>
          ) : (
            <>
              {isRunning && mounted ? (
                <>
                  <Music className="h-4 w-4 text-green-600" />
                  <span>Playing: {AVAILABLE_SOUNDS.find(s => s.id === sound)?.name}</span>
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Ready: {AVAILABLE_SOUNDS.find(s => s.id === sound)?.name}</span>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default AudioControlsHydrationSafe;