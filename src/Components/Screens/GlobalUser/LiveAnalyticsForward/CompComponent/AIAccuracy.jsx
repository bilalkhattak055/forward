import React from 'react';
import { Card, CardBody } from 'reactstrap';
import HourlyPerformance from './HourlyPerformance';

const AIAccuracy = () => {
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
    <Card
    className='p-3'
      style={{
        background: '#141E2B',
        border: '0.5px solid rgb(37, 37, 37)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        height:"230px",
        justifyContent: 'center',
        boxShadow: '0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.6)'

      }}
    >
      <CardBody
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <div
          style={{
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '4.8rem',
            fontWeight: 600,
            letterSpacing: '1px',
            lineHeight: 1,
          }}
        >
          95.6%
        </div>
        <div
          style={{
            color: '#b0b8c1',
            fontSize: '1.4rem',
            fontWeight: 500,
            marginTop: '8px',
            letterSpacing: '1px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          OVERALL ACCURACY
        </div>
      </CardBody>
    </Card>
    <HourlyPerformance/>
    </div>
  );
};

export default AIAccuracy;
