'use client';

// Pomodoro Timer Component - Fresh version to fix HMR issues
import { useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTimerStore } from '@/lib/store';
import { useAudio } from '@/hooks/useAudio';
import { Play, Pause, RotateCcw, SkipForward, Coffee, Briefcase } from 'lucide-react';

interface PomodoroTimerProps {
  className?: string;
}

export function PomodoroTimer({ className = '' }: PomodoroTimerProps) {
  const {
    secondsLeft,
    totalSeconds,
    isRunning,
    isCompleted,
    mode,
    pomodoro,
    startTimer,
    pauseTimer,
    resetPomodoro,
    nextPomodoroPhase,
    tick,
    setMode,
  } = useTimerStore();

  const audio = useAudio();

  // Set mode to pomodoro when component mounts
  useEffect(() => {
    if (mode !== 'pomodoro') {
      setMode('pomodoro');
    }
  }, [mode, setMode]);

  // Timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, secondsLeft, tick]);

  const getNextPhaseMessage = useCallback(() => {
    if (pomodoro.currentPhase === 'work') {
      const isLongBreak = pomodoro.completedCycles % pomodoro.cycles === 0;
      return isLongBreak ? 'Time for a long break!' : 'Time for a short break!';
    }
    return 'Ready for the next work session!';
  }, [pomodoro.currentPhase, pomodoro.completedCycles, pomodoro.cycles]);

  // Handle phase completion
  useEffect(() => {
    if (isCompleted && mode === 'pomodoro') {
      // Show completion notification
      if ('Notification' in window && Notification.permission === 'granted') {
        const phaseText = pomodoro.currentPhase === 'work' ? 'Work session' : 
                         pomodoro.currentPhase === 'short' ? 'Short break' : 'Long break';
        
        new Notification('Pomodoro Phase Complete!', {
          body: `Your ${phaseText.toLowerCase()} is complete. ${getNextPhaseMessage()}`,
          icon: '/favicon.ico',
        });
      }
    }
  }, [isCompleted, mode, pomodoro.currentPhase, getNextPhaseMessage]);

  // Keyboard shortcuts
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      if (isRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    }
    if (event.code === 'KeyR' && event.ctrlKey) {
      event.preventDefault();
      resetPomodoro();
    }
    if (event.code === 'KeyN' && event.ctrlKey) {
      event.preventDefault();
      nextPomodoroPhase();
    }
  }, [isRunning, startTimer, pauseTimer, resetPomodoro, nextPomodoroPhase]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  // Get phase display info
  const getPhaseInfo = () => {
    const phaseNames = {
      work: 'Work Session',
      short: 'Short Break',
      long: 'Long Break',
    };
    
    const phaseColors = {
      work: 'text-blue-600',
      short: 'text-green-600', 
      long: 'text-purple-600',
    };

    const phaseIcons = {
      work: Briefcase,
      short: Coffee,
      long: Coffee,
    };

    return {
      name: phaseNames[pomodoro.currentPhase],
      color: phaseColors[pomodoro.currentPhase],
      Icon: phaseIcons[pomodoro.currentPhase],
    };
  };

  const handleStartPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const handleSkipPhase = () => {
    nextPomodoroPhase();
  };

  const phaseInfo = getPhaseInfo();

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <phaseInfo.Icon className={`h-5 w-5 ${phaseInfo.color}`} />
          <span className={phaseInfo.color}>{phaseInfo.name}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="text-center space-y-6">
        {/* Progress Ring */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted-foreground/20"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className={`transition-all duration-1000 ease-linear ${
                isCompleted 
                  ? 'text-green-500' 
                  : isRunning 
                  ? phaseInfo.color 
                  : 'text-muted-foreground/60'
              }`}
            />
          </svg>
          
          {/* Time display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-4xl md:text-5xl font-mono font-bold transition-colors ${
              isCompleted 
                ? 'text-green-500' 
                : isRunning 
                ? phaseInfo.color 
                : 'text-foreground'
            }`}>
              {formatTime(secondsLeft)}
            </div>
          </div>
        </div>

        {/* Session Info */}
        <div className="text-center space-y-2">
          <div className="text-sm text-muted-foreground">
            Session {pomodoro.currentCycle} of {pomodoro.cycles}
          </div>
          <div className="text-xs text-muted-foreground">
            Completed cycles: {pomodoro.completedCycles}
            {pomodoro.currentPhase === 'work' && 
              ` • Long break after ${pomodoro.cycles - (pomodoro.completedCycles % pomodoro.cycles)} more work session(s)`
            }
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            onClick={handleStartPause}
            size="lg" 
            className="px-8"
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Start
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleSkipPhase}
            variant="outline" 
            size="lg"
            disabled={!isRunning && !isCompleted}
          >
            <SkipForward className="h-5 w-5 mr-2" />
            Skip
          </Button>
          
          <Button 
            onClick={resetPomodoro}
            variant="outline" 
            size="lg"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Audio Status */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          {audio.currentSound === 'none' ? (
            <span>Silent mode</span>
          ) : (
            <span>
              🎵 {audio.availableSounds.find(s => s.id === audio.currentSound)?.name}
              {` • ${audio.currentVolume}% volume`}
            </span>
          )}
        </div>

        {/* Keyboard Shortcuts */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div>
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Space</kbd> Start/Pause
            {' • '}
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+N</kbd> Skip
            {' • '}
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+R</kbd> Reset
          </div>
        </div>

        {/* Completion Message */}
        {isCompleted && (
          <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-green-800 dark:text-green-200 font-medium">
              🎉 Phase Complete!
            </div>
            <div className="text-green-700 dark:text-green-300 text-sm mt-1">
              {getNextPhaseMessage()}
            </div>
            <Button 
              onClick={nextPomodoroPhase}
              className="mt-3"
              size="sm"
            >
              Start Next Phase
            </Button>
          </div>
        )}

        {/* Next Phase Preview */}
        {!isCompleted && (
          <div className="text-xs text-muted-foreground">
            Up next: {getNextPhaseMessage().replace('Time for', '').replace('Ready for', '')}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PomodoroTimer;