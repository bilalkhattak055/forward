import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import HourlyPerformance from './HourlyPerformance';

const AIAccuracy = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderAccuracyCard = () => (
    <Card
      className="p-3"
      style={{
        background: '#141E2B',
        border: '0.5px solid rgb(37, 37, 37)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        height: '230px',
        justifyContent: 'center',
        boxShadow: '0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.6)',
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
            fontSize: '4rem',
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
            fontSize: '1.1rem',
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
  );

  if (screenWidth <= 1380 && screenWidth >= 1200) {
    // Custom layout for 1380px - 1200px
    return (
      <Row>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', width: '100%' }}>
          <Col className='mt-2' xl={5}>{renderAccuracyCard()}</Col>
          <Col xl={6}>
            <HourlyPerformance />
          </Col>
        </div>
      </Row>
    );
  }

  // Default stacked layout for <1200 or >1380
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {renderAccuracyCard()}
      <HourlyPerformance />
    </div>
  );
};

export default AIAccuracy;
