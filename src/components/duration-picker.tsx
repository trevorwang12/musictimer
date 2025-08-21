'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Clock, Plus, Minus } from 'lucide-react';
import { useTimerStore } from '@/lib/store';

interface DurationPickerProps {
  className?: string;
}

const PRESET_DURATIONS = [
  { minutes: 1, label: '1m' },
  { minutes: 2, label: '2m' },
  { minutes: 5, label: '5m' },
  { minutes: 10, label: '10m' },
  { minutes: 15, label: '15m' },
  { minutes: 20, label: '20m' },
  { minutes: 25, label: '25m' },
  { minutes: 30, label: '30m' },
  { minutes: 45, label: '45m' },
  { minutes: 60, label: '1h' },
  { minutes: 90, label: '1.5h' },
  { minutes: 120, label: '2h' },
];

export function DurationPicker({ className = '' }: DurationPickerProps) {
  const { minutes: storeMinutes, setMinutes, isRunning } = useTimerStore();
  const [inputMinutes, setInputMinutes] = useState(25); // Default fallback
  const [inputHours, setInputHours] = useState(0);
  const [inputMins, setInputMins] = useState(25);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Hydration effect
  useEffect(() => {
    setIsHydrated(true);
    // Manually trigger store hydration if using skipHydration
    if (typeof window !== 'undefined') {
      useTimerStore.persist.rehydrate();
    }
  }, []);

  // Update local state when store changes and after hydration
  useEffect(() => {
    if (isHydrated) {
      setInputMinutes(storeMinutes);
      setInputHours(Math.floor(storeMinutes / 60));
      setInputMins(storeMinutes % 60);
    }
  }, [storeMinutes, isHydrated]);

  const handleSliderChange = (values: number[]) => {
    const newMinutes = values[0];
    updateDuration(newMinutes);
  };

  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(event.target.value) || 0;
    const totalMinutes = Math.max(0, Math.min(24, hours)) * 60 + inputMins;
    if (totalMinutes >= 1 && totalMinutes <= 1440) {
      setInputHours(Math.max(0, Math.min(24, hours)));
      updateDuration(totalMinutes);
    }
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mins = parseInt(event.target.value) || 0;
    const totalMinutes = inputHours * 60 + Math.max(0, Math.min(59, mins));
    if (totalMinutes >= 1 && totalMinutes <= 1440) {
      setInputMins(Math.max(0, Math.min(59, mins)));
      updateDuration(totalMinutes);
    }
  };

  const updateDuration = (newMinutes: number) => {
    if (newMinutes < 1 || newMinutes > 1440 || !isHydrated) return;
    
    setInputMinutes(newMinutes);
    setMinutes(newMinutes);
  };

  const handlePresetClick = (minutes: number) => {
    updateDuration(minutes);
  };

  const adjustTime = (delta: number) => {
    const newMinutes = Math.max(1, Math.min(1440, inputMinutes + delta));
    updateDuration(newMinutes);
  };

  const formatDurationDisplay = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    
    if (hours === 0) {
      return `${mins} minute${mins !== 1 ? 's' : ''}`;
    } else if (mins === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      return `${hours}h ${mins}m`;
    }
  };

  // Determine appropriate slider range based on current value
  const getSliderMax = () => {
    if (inputMinutes <= 60) return 60; // 1 hour max for values <= 1 hour
    if (inputMinutes <= 240) return 240; // 4 hours max for values <= 4 hours
    return 1440; // 24 hours max for larger values
  };

  const sliderMax = getSliderMax();
  const sliderStep = inputMinutes <= 60 ? 1 : inputMinutes <= 240 ? 5 : 15;

  // Prevent hydration mismatch by only rendering after hydration
  if (!isHydrated) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Custom Duration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            Loading duration picker...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Custom Duration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Debug Info */}
        <div style={{ 
          background: 'yellow', 
          padding: '10px', 
          border: '2px solid red', 
          fontSize: '14px',
          marginBottom: '20px'
        }}>
          <div>🐛 DEBUG: isHydrated={isHydrated ? 'true' : 'false'}</div>
          <div>🐛 DEBUG: isRunning={isRunning ? 'true' : 'false'}</div>
          <div>🐛 DEBUG: inputMinutes={inputMinutes}</div>
          <div>🐛 DEBUG: storeMinutes={storeMinutes}</div>
        </div>
        {/* Time Input Fields */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <label className="text-sm font-medium block mb-1">Hours</label>
              <input
                type="number"
                min="0"
                max="24"
                value={inputHours}
                onChange={handleHoursChange}
                disabled={!isHydrated || isRunning}
                className="w-16 px-2 py-1 text-center border rounded-md bg-background [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="text-2xl font-bold text-muted-foreground">:</div>
            <div className="text-center">
              <label className="text-sm font-medium block mb-1">Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={inputMins}
                onChange={handleMinutesChange}
                disabled={!isHydrated || isRunning}
                className="w-16 px-2 py-1 text-center border rounded-md bg-background [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Quick Adjust Buttons */}
          <div className="flex items-center gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Adjust -5
                adjustTime(-5);
              }}
              className="px-2"
            >
              <Minus className="h-4 w-4" />
              5m
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Adjust -1
                adjustTime(-1);
              }}
              className="px-2"
            >
              <Minus className="h-4 w-4" />
              1m
            </Button>
            <div className="mx-4 text-center">
              <div className="text-lg font-semibold text-primary">
                {formatDurationDisplay(inputMinutes)}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Adjust +1
                adjustTime(1);
              }}
              className="px-2"
            >
              <Plus className="h-4 w-4" />
              1m
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Adjust +5
                adjustTime(5);
              }}
              className="px-2"
            >
              <Plus className="h-4 w-4" />
              5m
            </Button>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 min</span>
            <span>{sliderMax === 60 ? '1 hour' : sliderMax === 240 ? '4 hours' : '24 hours'}</span>
          </div>
          <Slider
            value={[Math.min(inputMinutes, sliderMax)]}
            onValueChange={handleSliderChange}
            min={1}
            max={sliderMax}
            step={sliderStep}
            disabled={isRunning}
            className="w-full"
          />
        </div>

        {/* Preset Buttons */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Quick Presets</h4>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {PRESET_DURATIONS.map((preset) => (
              <Button
                key={preset.minutes}
                variant={inputMinutes === preset.minutes ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  // Preset selected
                  handlePresetClick(preset.minutes);
                }}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Validation Messages */}
        {inputMinutes < 1 && (
          <div className="text-sm text-destructive text-center">
            Duration must be at least 1 minute
          </div>
        )}
        {inputMinutes > 1440 && (
          <div className="text-sm text-destructive text-center">
            Duration cannot exceed 24 hours (1440 minutes)
          </div>
        )}

        {/* Usage Tips */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <div>💡 Use keyboard arrows in input fields for fine adjustment</div>
          <div>Range: 1 minute to 24 hours</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DurationPicker;