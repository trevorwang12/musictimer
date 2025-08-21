'use client';

import { useEffect, useState } from 'react';
import { useTimerStore } from '@/lib/store';

export function AccessibilityAnnouncer() {
  const { secondsLeft, isRunning, isCompleted, mode, pomodoro } = useTimerStore();
  const [lastAnnouncementTime, setLastAnnouncementTime] = useState(0);

  // Announce timer state changes for screen readers
  useEffect(() => {
    const now = Date.now();
    
    // Don't announce too frequently (minimum 5 seconds between announcements)
    if (now - lastAnnouncementTime < 5000) return;

    let message = '';

    if (isCompleted) {
      if (mode === 'pomodoro') {
        const phaseNames = {
          work: 'work session',
          short: 'short break',
          long: 'long break',
        };
        message = `${phaseNames[pomodoro.currentPhase]} completed`;
      } else {
        message = 'Timer completed';
      }
    } else if (isRunning) {
      const minutes = Math.floor(secondsLeft / 60);
      
      // Only announce at specific intervals
      const shouldAnnounce = 
        secondsLeft === 60 || // 1 minute remaining
        secondsLeft === 300 || // 5 minutes remaining  
        secondsLeft === 600 || // 10 minutes remaining
        (secondsLeft <= 10 && secondsLeft > 0); // Final countdown

      if (shouldAnnounce) {
        if (secondsLeft <= 10) {
          message = `${secondsLeft} seconds remaining`;
        } else {
          message = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} remaining`;
        }
      }
    }

    if (message) {
      announceToScreenReader(message);
      setLastAnnouncementTime(now);
    }
  }, [secondsLeft, isRunning, isCompleted, mode, pomodoro, lastAnnouncementTime]);

  const announceToScreenReader = (message: string) => {
    // Create a temporary element to announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return null; // This component doesn't render anything visible
}

export default AccessibilityAnnouncer;