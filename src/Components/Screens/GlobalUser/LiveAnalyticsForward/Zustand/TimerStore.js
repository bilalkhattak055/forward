import { create } from 'zustand';

const useTimerStore = create((set) => ({
  isRunning: false,
  isPaused: false,
  totalSeconds: 0, // Start from 0
  
  startTimer: () => set((state) => ({
    isRunning: true,
    isPaused: false
  })),
  
  stopTimer: () => set((state) => ({
    isRunning: false,
    isPaused: true
  })),
  
  resetTimer: () => set((state) => ({
    isRunning: false,
    isPaused: false,
    totalSeconds: 0
  })),
  
  incrementTimer: () => set((state) => ({
    totalSeconds: state.totalSeconds + 1
  })),
}));

export default useTimerStore;