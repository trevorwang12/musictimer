'use client';

import { useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTimerStore } from '@/lib/store';
import { useAudio } from '@/hooks/useAudio';
import { AudioControls } from '@/components/audio-controls';
import AccessibilityAnnouncer from '@/components/accessibility-announcer';
import { Play, Pause, RotateCcw, Music, VolumeX } from 'lucide-react';

interface TimerProps {
  initialMinutes?: number;
  autoFocus?: boolean;
}

export function Timer({ initialMinutes, autoFocus = false }: TimerProps) {
  const {
    secondsLeft,
    totalSeconds,
    isRunning,
    isCompleted,
    mode,
    pomodoro,
    startTimer,
    pauseTimer,
    resetTimer,
    tick,
    setMinutes,
  } = useTimerStore();

  // Initialize audio
  const audio = useAudio();

  // Initialize timer with provided minutes
  useEffect(() => {
    if (initialMinutes && initialMinutes !== Math.ceil(secondsLeft / 60)) {
      setMinutes(initialMinutes);
    }
  }, [initialMinutes, setMinutes, secondsLeft]);

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
      resetTimer();
    }
  }, [isRunning, startTimer, pauseTimer, resetTimer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Completion notification
  useEffect(() => {
    if (isCompleted) {
      // Browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        const phaseText = mode === 'pomodoro' 
          ? `${pomodoro.currentPhase === 'work' ? 'Work' : 'Break'} session`
          : 'Timer';
        
        new Notification('Timer Completed!', {
          body: `Your ${phaseText} is complete.`,
          icon: '/favicon.ico',
        });
      }
    }
  }, [isCompleted, mode, pomodoro.currentPhase]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for visual indicator
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  // Get current phase display for Pomodoro
  const getPhaseDisplay = () => {
    if (mode !== 'pomodoro') return null;
    
    const phaseNames = {
      work: 'Work Session',
      short: 'Short Break',
      long: 'Long Break',
    };
    
    return (
      <div className="text-center mb-4">
        <div className="text-lg font-medium text-muted-foreground">
          {phaseNames[pomodoro.currentPhase]}
        </div>
        <div className="text-sm text-muted-foreground">
          Session {pomodoro.currentCycle} of {pomodoro.cycles}
          {pomodoro.currentPhase === 'work' && ` • Long break after session ${pomodoro.cycles}`}
        </div>
      </div>
    );
  };

  const handleStartPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <AccessibilityAnnouncer />
      <CardContent className="p-8 text-center" role="main" aria-label="Timer display and controls">
        {/* Pomodoro Phase Display */}
        {getPhaseDisplay()}
        
        {/* Progress Ring */}
        <div className="relative w-48 h-48 mx-auto mb-8" role="img" aria-label={`Timer progress: ${Math.round(progress)}% complete`}>
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
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
                  ? 'text-primary' 
                  : 'text-muted-foreground/60'
              }`}
            />
          </svg>
          
          {/* Time display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`text-4xl md:text-5xl font-mono font-bold transition-colors ${
                isCompleted 
                  ? 'text-green-500' 
                  : isRunning 
                  ? 'text-primary' 
                  : 'text-foreground'
              }`}
              aria-live="polite"
              aria-atomic="true"
              aria-label={`Time remaining: ${formatTime(secondsLeft)}`}
            >
              {formatTime(secondsLeft)}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <Button 
            onClick={handleStartPause}
            size="lg" 
            className="px-8"
            autoFocus={autoFocus}
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
            aria-pressed={isRunning}
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5 mr-2" aria-hidden="true" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" aria-hidden="true" />
                Start
              </>
            )}
          </Button>
          
          <Button 
            onClick={resetTimer}
            variant="outline" 
            size="lg"
            aria-label="Reset timer to initial time"
          >
            <RotateCcw className="h-5 w-5 mr-2" aria-hidden="true" />
            Reset
          </Button>
        </div>

        {/* Audio Status */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          {audio.currentSound === 'none' ? (
            <>
              <VolumeX className="h-4 w-4" />
              <span>Silent mode</span>
            </>
          ) : (
            <>
              <Music className={`h-4 w-4${audio.isPlaying ? ' text-green-600' : ''}`} />
              <span>
                {audio.availableSounds.find(s => s.id === audio.currentSound)?.name || 'Background music'}
                {` • ${audio.currentVolume}% volume`}
              </span>
            </>
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-6 text-xs text-muted-foreground">
          <div>Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Space</kbd> to start/pause</div>
          <div>Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+R</kbd> to reset</div>
        </div>

        {/* Completion Message */}
        {isCompleted && (
          <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-green-800 dark:text-green-200 font-medium">
              🎉 Timer Complete!
            </div>
            <div className="text-green-700 dark:text-green-300 text-sm mt-1">
              {mode === 'pomodoro' 
                ? `${pomodoro.currentPhase === 'work' ? 'Work' : 'Break'} session finished. Great job!`
                : 'Time to take a break or move on to your next task.'
              }
            </div>
          </div>
        )}
      </CardContent>
      
      {/* Audio Controls */}
      <div className="px-8 pb-8">
        <AudioControls />
      </div>
    </Card>
  );
}

export default Timer;