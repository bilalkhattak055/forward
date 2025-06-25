import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const HourlyPerformance = () => {
  const data = [
    { name: 'Pass', value: 83 },
    { name: 'Defective', value: 17 }
  ];

  const COLORS = {
    Pass: '#006D6A',
    Defective: 'rgb(221 150 0)'
  };

  return (
    <Card
      className='mt-2'
      style={{
        background: '#141E2B',
        border: '0.5px solid rgb(37, 37, 37)',
        borderRadius: '12px',
        height: "450px",
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
        {/* Header */}
        <div
          style={{
            color: '#b0b8c1',
            fontSize: '1.4rem',
            fontWeight: 500,
            letterSpacing: '1px',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '15px',
            textAlign: 'center'
          }}
        >
          HOURLY PERFORMANCE
        </div>
        
        {/* Chart Container */}
        <div style={{ position: 'relative', width: '250px', height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                startAngle={80}
                endAngle={450}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '2.9rem',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              83%
            </div>
            <div
              style={{
                color: '#b0b8c1',
                fontSize: '1rem',
                fontWeight: 400,
                fontFamily: 'Inter, sans-serif',
                marginTop: '4px'
              }}
            >
              Pass
            </div>
            
          </div>
          <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div 
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: COLORS.Pass
              }}
            />
            <span
              style={{
                color: '#b0b8c1',
                fontSize: '1.2rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400
              }}
            >
              Pass
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div 
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: COLORS.Defective
              }}
            />
            <span
              style={{
                color: '#b0b8c1',
                fontSize: '1.2rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400
              }}
            >
              Defective
            </span>
          </div>
        </div>
        </div>
        
        {/* Legend */}
        
      </CardBody>
    </Card>
  );
};

export default HourlyPerformance;