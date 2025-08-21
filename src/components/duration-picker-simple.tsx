'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Plus, Minus } from 'lucide-react';

interface DurationPickerSimpleProps {
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
];

export function DurationPickerSimple({ className = '' }: DurationPickerSimpleProps) {
  const [inputMinutes, setInputMinutes] = useState(25);
  const [inputHours, setInputHours] = useState(0);
  const [inputMins, setInputMins] = useState(25);

  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(event.target.value) || 0;
    const totalMinutes = Math.max(0, Math.min(24, hours)) * 60 + inputMins;
    if (totalMinutes >= 1 && totalMinutes <= 1440) {
      setInputHours(Math.max(0, Math.min(24, hours)));
      setInputMinutes(totalMinutes);
    }
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mins = parseInt(event.target.value) || 0;
    const totalMinutes = inputHours * 60 + Math.max(0, Math.min(59, mins));
    if (totalMinutes >= 1 && totalMinutes <= 1440) {
      setInputMins(Math.max(0, Math.min(59, mins)));
      setInputMinutes(totalMinutes);
    }
  };

  const handlePresetClick = (minutes: number) => {
    // Preset clicked
    alert(`Preset clicked: ${minutes} minutes`); // Visible feedback
    setInputMinutes(minutes);
    setInputHours(Math.floor(minutes / 60));
    setInputMins(minutes % 60);
  };

  const adjustTime = (delta: number) => {
    // Adjust time
    alert(`Adjust time by: ${delta} minutes`); // Visible feedback
    const newMinutes = Math.max(1, Math.min(1440, inputMinutes + delta));
    setInputMinutes(newMinutes);
    setInputHours(Math.floor(newMinutes / 60));
    setInputMins(newMinutes % 60);
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

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Custom Duration (Simple Test)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
                className="w-16 px-2 py-1 text-center border rounded-md bg-background"
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
                className="w-16 px-2 py-1 text-center border rounded-md bg-background"
              />
            </div>
          </div>

          {/* Quick Adjust Buttons */}
          <div className="flex items-center gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustTime(-5)}
              className="px-2"
            >
              <Minus className="h-4 w-4" />
              5m
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustTime(-1)}
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
              onClick={() => adjustTime(1)}
              className="px-2"
            >
              <Plus className="h-4 w-4" />
              1m
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustTime(5)}
              className="px-2"
            >
              <Plus className="h-4 w-4" />
              5m
            </Button>
          </div>
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
                onClick={() => handlePresetClick(preset.minutes)}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Debug Info */}
        <div className="text-xs text-muted-foreground border rounded p-2">
          <div>Debug: {inputMinutes} total minutes</div>
          <div>Hours: {inputHours}, Minutes: {inputMins}</div>
          <div>Display: {formatDurationDisplay(inputMinutes)}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DurationPickerSimple;