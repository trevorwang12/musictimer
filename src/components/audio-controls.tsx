'use client';

import { useState } from 'react';
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
import { useAudio } from '@/hooks/useAudio';
import type { SoundID } from '@/lib/store';

interface AudioControlsProps {
  compact?: boolean;
  className?: string;
}

export function AudioControls({ compact = false, className = '' }: AudioControlsProps) {
  const [showSettings, setShowSettings] = useState(false);
  const {
    currentSound,
    currentVolume,
    isPlaying,
    availableSounds,
    changeSound,
    changeVolume,
    previewSound,
  } = useAudio();

  // Check if audio files are available
  const hasAudioFiles = availableSounds.length > 1; // More than just 'none'

  const handleVolumeChange = (values: number[]) => {
    changeVolume(values[0]);
  };

  const handleSoundSelect = (soundId: SoundID) => {
    changeSound(soundId);
  };

  const handlePreview = (soundId: SoundID) => {
    if (soundId !== 'none' && soundId !== currentSound) {
      previewSound(soundId);
    }
  };

  const getVolumeIcon = () => {
    if (currentVolume === 0 || currentSound === 'none') return VolumeX;
    if (currentVolume < 50) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

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
                  {!hasAudioFiles ? (
                    <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                      <p className="font-medium mb-1">Audio files not found</p>
                      <p>Background music is currently unavailable. The timer will work in silent mode.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {availableSounds.map((sound) => (
                        <Button
                          key={sound.id}
                          variant={currentSound === sound.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleSoundSelect(sound.id)}
                          className="justify-start text-xs"
                        >
                          {sound.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                
                {currentSound !== 'none' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Volume</label>
                    <div className="flex items-center gap-3">
                      <VolumeIcon className="h-4 w-4 text-muted-foreground" />
                      <Slider
                        value={[currentVolume]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground w-8">
                        {currentVolume}%
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
          {!hasAudioFiles ? (
            <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <VolumeX className="h-5 w-5 text-muted-foreground" />
                <p className="font-medium">Audio files not found</p>
              </div>
              <p className="mb-3">Background music is currently unavailable. The timer will work in silent mode.</p>
              <p className="text-xs">To add background sounds, place MP3 files named rain.mp3, ocean.mp3, cafe.mp3, and white.mp3 in the public/audio/ directory.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableSounds.map((sound) => (
                <div key={sound.id} className="flex items-center gap-2">
                  <Button
                    variant={currentSound === sound.id ? "default" : "outline"}
                    onClick={() => handleSoundSelect(sound.id)}
                    className="flex-1 justify-start"
                  >
                    {sound.name}
                  </Button>
                  
                  {sound.id !== 'none' && sound.id !== currentSound && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreview(sound.id)}
                      className="px-2"
                      title="Preview sound"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Volume Control */}
        {currentSound !== 'none' && (
          <div>
            <label className="text-sm font-medium mb-3 block">Volume</label>
            <div className="flex items-center gap-4">
              <VolumeIcon className="h-5 w-5 text-muted-foreground" />
              <Slider
                value={[currentVolume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-12">
                {currentVolume}%
              </span>
            </div>
          </div>
        )}

        {/* Status Display */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {currentSound === 'none' ? (
            <>
              <VolumeX className="h-4 w-4" />
              <span>Silent mode</span>
            </>
          ) : (
            <>
              {isPlaying ? (
                <>
                  <Music className="h-4 w-4 text-green-600" />
                  <span>Playing: {availableSounds.find(s => s.id === currentSound)?.name}</span>
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Ready: {availableSounds.find(s => s.id === currentSound)?.name}</span>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default AudioControls;