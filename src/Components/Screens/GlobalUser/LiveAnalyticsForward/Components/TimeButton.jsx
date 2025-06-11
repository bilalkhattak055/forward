import React from 'react';
import Timer from '../asset/timer.svg';
import stop from '../asset/stop.svg';
import Reprocess from '../asset/reprocess.svg';
import useTimerStore from '../Zustand/TimerStore';

const TimerButtons = () => {
  // Get timer actions from Zustand store
  const { startTimer, stopTimer, resetTimer, isRunning, isPaused } = useTimerStore();

  const handleStartTimer = () => {
    startTimer();
  };

  const handleStopTimer = () => {
    stopTimer();
  };

  const handleResetTimer = () => {
    resetTimer();
  };

  return (
    <div className="d-flex gap-3">
      <button 
        onClick={handleStartTimer}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontWeight: '500',
          border: "2px solid #335436",
          color: "#335436",
          backgroundColor: "#FFFFFF",
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          textWrap: "nowrap"
        }}
      >
        <img 
          src={Timer}
          alt="Start Timer" 
          style={{ marginRight: '8px' }} 
        />
        {isPaused ? "Resume Timer" : "Start Timer"}
      </button>
      
      <button 
        onClick={handleStopTimer}
        disabled={!isRunning}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontWeight: '500',
          border: "2px solid #335436",
          color: "#335436",
          backgroundColor: "#FFFFFF",
          opacity: !isRunning ? 0.6 : 1,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          textWrap: "nowrap"
        }}
      >
        <img 
          src={stop}
          alt="Stop Timer" 
          style={{ marginRight: '8px' }} 
        />
        Stop Timer
      </button>
      
      <button 
        onClick={handleResetTimer}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontWeight: '500',
          border: "2px solid #335436",
          color: "#335436",
          backgroundColor: "#FFFFFF",
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          textWrap: "nowrap",
          cursor:"pointer"
        }}
      >
        <img 
          src={Reprocess}
          alt="Reset Values" 
          style={{ marginRight: '8px',cursor: 'pointer' }} 
        />
        Reset Values
      </button>
    </div>
  );
};

export default TimerButtons;