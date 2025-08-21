import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SoundID = 'rain' | 'ocean' | 'cafe' | 'white' | 'none';

export interface TimerState {
  // Timer mode
  mode: 'countdown' | 'pomodoro';
  
  // Countdown timer state
  minutes: number;
  secondsLeft: number;
  totalSeconds: number;
  isRunning: boolean;
  isCompleted: boolean;
  
  // Audio settings
  sound: SoundID;
  volume: number;
  
  // Pomodoro state
  pomodoro: {
    workMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
    cycles: number;
    currentPhase: 'work' | 'short' | 'long';
    currentCycle: number;
    completedCycles: number;
  };
  
  // User presets
  presets: Array<{
    id: string;
    name: string;
    minutes: number;
    sound: SoundID;
    volume: number;
  }>;
}

export interface TimerActions {
  // Timer controls
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setMinutes: (minutes: number) => void;
  tick: () => void;
  
  // Audio controls
  setSound: (sound: SoundID) => void;
  setVolume: (volume: number) => void;
  
  // Pomodoro controls
  setPomodoroSettings: (settings: Partial<TimerState['pomodoro']>) => void;
  nextPomodoroPhase: () => void;
  resetPomodoro: () => void;
  
  // Preset management
  savePreset: (name: string) => void;
  deletePreset: (id: string) => void;
  loadPreset: (id: string) => void;
  
  // Mode switching
  setMode: (mode: 'countdown' | 'pomodoro') => void;
}

export const useTimerStore = create<TimerState & TimerActions>()(
  persist(
    (set, get) => ({
      // Initial state
      mode: 'countdown',
      minutes: 25,
      secondsLeft: 1500, // 25 minutes in seconds
      totalSeconds: 1500,
      isRunning: false,
      isCompleted: false,
      sound: 'rain',
      volume: 60,
      
      pomodoro: {
        workMinutes: 25,
        shortBreakMinutes: 5,
        longBreakMinutes: 15,
        cycles: 4,
        currentPhase: 'work',
        currentCycle: 1,
        completedCycles: 0,
      },
      
      presets: [
        {
          id: 'focus25',
          name: 'Focus Session',
          minutes: 25,
          sound: 'rain',
          volume: 60,
        },
        {
          id: 'study45',
          name: 'Study Block',
          minutes: 45,
          sound: 'cafe',
          volume: 50,
        },
      ],
      
      // Timer actions
      startTimer: () => {
        set({ isRunning: true, isCompleted: false });
      },
      
      pauseTimer: () => {
        set({ isRunning: false });
      },
      
      resetTimer: () => {
        const state = get();
        const totalSeconds = state.mode === 'countdown' 
          ? state.minutes * 60 
          : state.pomodoro.workMinutes * 60;
          
        set({
          secondsLeft: totalSeconds,
          totalSeconds,
          isRunning: false,
          isCompleted: false,
        });
      },
      
      setMinutes: (minutes: number) => {
        if (minutes < 1 || minutes > 1440) return; // Validate range
        
        const totalSeconds = minutes * 60;
        set({
          minutes,
          secondsLeft: totalSeconds,
          totalSeconds,
          isRunning: false,
          isCompleted: false,
        });
      },
      
      tick: () => {
        const state = get();
        if (!state.isRunning || state.secondsLeft <= 0) return;
        
        const newSecondsLeft = state.secondsLeft - 1;
        
        if (newSecondsLeft <= 0) {
          set({ 
            secondsLeft: 0, 
            isRunning: false, 
            isCompleted: true 
          });
          
          // Handle pomodoro phase transitions
          if (state.mode === 'pomodoro') {
            get().nextPomodoroPhase();
          }
        } else {
          set({ secondsLeft: newSecondsLeft });
        }
      },
      
      // Audio actions
      setSound: (sound: SoundID) => {
        set({ sound });
      },
      
      setVolume: (volume: number) => {
        if (volume < 0 || volume > 100) return;
        set({ volume });
      },
      
      // Pomodoro actions
      setPomodoroSettings: (settings) => {
        const state = get();
        const newPomodoro = { ...state.pomodoro, ...settings };
        
        // Calculate new timer duration based on current phase and new settings
        let newDuration: number;
        switch (newPomodoro.currentPhase) {
          case 'work':
            newDuration = (settings.workMinutes ?? newPomodoro.workMinutes) * 60;
            break;
          case 'short':
            newDuration = (settings.shortBreakMinutes ?? newPomodoro.shortBreakMinutes) * 60;
            break;
          case 'long':
            newDuration = (settings.longBreakMinutes ?? newPomodoro.longBreakMinutes) * 60;
            break;
          default:
            newDuration = (settings.workMinutes ?? newPomodoro.workMinutes) * 60;
        }
        
        set({
          pomodoro: newPomodoro,
          // Update timer duration if not currently running
          ...(!state.isRunning && {
            secondsLeft: newDuration,
            totalSeconds: newDuration,
          }),
        });
      },
      
      nextPomodoroPhase: () => {
        const state = get();
        const { pomodoro } = state;
        let newPhase: 'work' | 'short' | 'long' = 'work';
        let newCycle = pomodoro.currentCycle;
        let completedCycles = pomodoro.completedCycles;
        
        if (pomodoro.currentPhase === 'work') {
          completedCycles++;
          if (completedCycles % pomodoro.cycles === 0) {
            newPhase = 'long';
          } else {
            newPhase = 'short';
          }
        } else {
          newPhase = 'work';
          if (pomodoro.currentPhase === 'long') {
            newCycle = 1;
          } else {
            newCycle++;
          }
        }
        
        // Calculate new duration
        let newDuration: number;
        switch (newPhase) {
          case 'work':
            newDuration = pomodoro.workMinutes * 60;
            break;
          case 'short':
            newDuration = pomodoro.shortBreakMinutes * 60;
            break;
          case 'long':
            newDuration = pomodoro.longBreakMinutes * 60;
            break;
        }
        
        set({
          pomodoro: {
            ...pomodoro,
            currentPhase: newPhase,
            currentCycle: newCycle,
            completedCycles,
          },
          secondsLeft: newDuration,
          totalSeconds: newDuration,
          isRunning: false,
          isCompleted: false,
        });
      },
      
      resetPomodoro: () => {
        const state = get();
        const workDuration = state.pomodoro.workMinutes * 60;
        
        set({
          pomodoro: {
            ...state.pomodoro,
            currentPhase: 'work',
            currentCycle: 1,
            completedCycles: 0,
          },
          secondsLeft: workDuration,
          totalSeconds: workDuration,
          isRunning: false,
          isCompleted: false,
        });
      },
      
      // Preset actions
      savePreset: (name: string) => {
        const state = get();
        const newPreset = {
          id: Date.now().toString(),
          name,
          minutes: state.minutes,
          sound: state.sound,
          volume: state.volume,
        };
        
        set((state) => ({
          presets: [...state.presets, newPreset]
        }));
      },
      
      deletePreset: (id: string) => {
        set((state) => ({
          presets: state.presets.filter(p => p.id !== id)
        }));
      },
      
      loadPreset: (id: string) => {
        const state = get();
        const preset = state.presets.find(p => p.id === id);
        if (!preset) return;
        
        get().setMinutes(preset.minutes);
        set({
          sound: preset.sound,
          volume: preset.volume,
        });
      },
      
      // Mode switching
      setMode: (mode: 'countdown' | 'pomodoro') => {
        const state = get();
        
        if (mode === 'pomodoro') {
          const workDuration = state.pomodoro.workMinutes * 60;
          set({
            mode,
            secondsLeft: workDuration,
            totalSeconds: workDuration,
            isRunning: false,
            isCompleted: false,
          });
        } else {
          const countdownDuration = state.minutes * 60;
          set({
            mode,
            secondsLeft: countdownDuration,
            totalSeconds: countdownDuration,
            isRunning: false,
            isCompleted: false,
          });
        }
      },
    }),
    {
      name: 'timer-storage',
      partialize: (state) => ({
        sound: state.sound,
        volume: state.volume,
        minutes: state.minutes,
        pomodoro: state.pomodoro,
        presets: state.presets,
      }),
      // Prevent hydration mismatch by only using storage on client
      skipHydration: true,
    }
  )
);