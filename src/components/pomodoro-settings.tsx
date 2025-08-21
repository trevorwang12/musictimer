'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Settings, Clock, Coffee, Repeat, Save, RotateCcw } from 'lucide-react';
import { useTimerStore } from '@/lib/store';

interface PomodoroSettingsProps {
  className?: string;
}

export function PomodoroSettings({ className = '' }: PomodoroSettingsProps) {
  const { pomodoro, setPomodoroSettings } = useTimerStore();
  
  // Local state for settings form
  const [localSettings, setLocalSettings] = useState({
    workMinutes: pomodoro.workMinutes,
    shortBreakMinutes: pomodoro.shortBreakMinutes,
    longBreakMinutes: pomodoro.longBreakMinutes,
    cycles: pomodoro.cycles,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateLocalSetting = (key: keyof typeof localSettings, value: number) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setPomodoroSettings(localSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    const defaultSettings = {
      workMinutes: 25,
      shortBreakMinutes: 5,
      longBreakMinutes: 15,
      cycles: 4,
    };
    
    setLocalSettings(defaultSettings);
    setPomodoroSettings(defaultSettings);
    setHasChanges(false);
  };

  const handleRevert = () => {
    setLocalSettings({
      workMinutes: pomodoro.workMinutes,
      shortBreakMinutes: pomodoro.shortBreakMinutes,
      longBreakMinutes: pomodoro.longBreakMinutes,
      cycles: pomodoro.cycles,
    });
    setHasChanges(false);
  };

  // Preset configurations
  const presets = [
    { name: 'Classic', work: 25, short: 5, long: 15, cycles: 4 },
    { name: 'Extended', work: 45, short: 10, long: 20, cycles: 3 },
    { name: 'Short Burst', work: 15, short: 3, long: 10, cycles: 6 },
    { name: 'Study Session', work: 50, short: 10, long: 30, cycles: 3 },
  ];

  const handlePreset = (preset: typeof presets[0]) => {
    setLocalSettings({
      workMinutes: preset.work,
      shortBreakMinutes: preset.short,
      longBreakMinutes: preset.long,
      cycles: preset.cycles,
    });
    setHasChanges(true);
  };

  const formatDuration = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
    }
    return `${minutes}m`;
  };

  const getTotalTime = (): string => {
    const totalWork = localSettings.workMinutes * localSettings.cycles;
    const totalShortBreaks = localSettings.shortBreakMinutes * (localSettings.cycles - 1);
    const totalLongBreaks = localSettings.longBreakMinutes;
    const total = totalWork + totalShortBreaks + totalLongBreaks;
    
    return formatDuration(total);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Pomodoro Settings
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Preset Buttons */}
        <div>
          <h4 className="text-sm font-medium mb-3">Quick Presets</h4>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => handlePreset(preset)}
                className="text-xs"
              >
                {preset.name}
                <span className="text-muted-foreground ml-1">
                  ({preset.work}/{preset.short})
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Work Duration */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-blue-600" />
            <label className="text-sm font-medium">Work Duration</label>
            <span className="text-sm text-muted-foreground">
              {formatDuration(localSettings.workMinutes)}
            </span>
          </div>
          <Slider
            value={[localSettings.workMinutes]}
            onValueChange={(value) => updateLocalSetting('workMinutes', value[0])}
            min={5}
            max={120}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5 min</span>
            <span>2 hours</span>
          </div>
        </div>

        {/* Short Break Duration */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Coffee className="h-4 w-4 text-green-600" />
            <label className="text-sm font-medium">Short Break Duration</label>
            <span className="text-sm text-muted-foreground">
              {formatDuration(localSettings.shortBreakMinutes)}
            </span>
          </div>
          <Slider
            value={[localSettings.shortBreakMinutes]}
            onValueChange={(value) => updateLocalSetting('shortBreakMinutes', value[0])}
            min={1}
            max={30}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 min</span>
            <span>30 min</span>
          </div>
        </div>

        {/* Long Break Duration */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Coffee className="h-4 w-4 text-purple-600" />
            <label className="text-sm font-medium">Long Break Duration</label>
            <span className="text-sm text-muted-foreground">
              {formatDuration(localSettings.longBreakMinutes)}
            </span>
          </div>
          <Slider
            value={[localSettings.longBreakMinutes]}
            onValueChange={(value) => updateLocalSetting('longBreakMinutes', value[0])}
            min={5}
            max={60}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5 min</span>
            <span>1 hour</span>
          </div>
        </div>

        {/* Cycles */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Repeat className="h-4 w-4 text-orange-600" />
            <label className="text-sm font-medium">Work Sessions Before Long Break</label>
            <span className="text-sm text-muted-foreground">
              {localSettings.cycles} session{localSettings.cycles !== 1 ? 's' : ''}
            </span>
          </div>
          <Slider
            value={[localSettings.cycles]}
            onValueChange={(value) => updateLocalSetting('cycles', value[0])}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 session</span>
            <span>10 sessions</span>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <h4 className="text-sm font-medium">Session Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-muted-foreground">One cycle includes:</div>
              <ul className="space-y-1">
                <li>• {localSettings.cycles}× {formatDuration(localSettings.workMinutes)} work</li>
                <li>• {localSettings.cycles - 1}× {formatDuration(localSettings.shortBreakMinutes)} short break</li>
                <li>• 1× {formatDuration(localSettings.longBreakMinutes)} long break</li>
              </ul>
            </div>
            <div>
              <div className="text-muted-foreground">Total time per cycle:</div>
              <div className="font-medium text-base">{getTotalTime()}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
          
          {hasChanges && (
            <Button
              onClick={handleRevert}
              variant="outline"
            >
              Cancel
            </Button>
          )}
          
          <Button
            onClick={handleReset}
            variant="outline"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
        </div>

        {/* Tips */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div>💡 <strong>Tip:</strong> Start with the Classic preset and adjust based on your focus patterns</div>
          <div>📚 <strong>Study Tip:</strong> Use longer work sessions (45-50 min) for deep learning</div>
          <div>⚡ <strong>Energy Tip:</strong> Use Short Burst for tasks requiring high concentration</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PomodoroSettings;