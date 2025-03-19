import React from 'react';
import Timer from '../asset/timer.svg';
import stop from '../asset/stop.svg';
import Reprocess from '../asset/reprocess.svg'


const TimerButtons = () => {
  return (
    <div className="d-flex gap-3 mb-2">
      <button  
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontWeight: '500',
          border:"2px solid #335436" ,
          color:"#335436",
          backgroundColor:"#FFFFFF",
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <img 
          src={Timer}
          alt="Start Timer" 
          style={{ marginRight: '8px'}} 
        />
        Start Timer
      </button>
      
      <button 
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: '500',
            border:"2px solid #335436" ,
            color:"#335436",
            backgroundColor:"#FFFFFF",
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
      >
        <img 
          src={stop}
          alt="Stop Timer" 
          style={{marginRight: '8px' }} 
        />
        Stop Timer
      </button>
      
      <button 
       style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        fontWeight: '500',
        border:"2px solid #335436" ,
        color:"#335436",
        backgroundColor:"#FFFFFF",
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      >
        <img 
          src={Reprocess}
          alt="Reset Values" 
          style={{marginRight: '8px' }} 
        />
        Reset Values
      </button>
    </div>
  );
};

export default TimerButtons;