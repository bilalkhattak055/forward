import React, { useState, useEffect } from 'react';
import { Card, CardBody, Badge, Row, Col } from 'reactstrap';
import { Clock, Box, FileText, ShoppingBag, AlertCircle } from 'react-feather';
import { Loader3 } from '../../../../../CommonElements/Spinner/loader';
import TimerButtons from './TimeButton';

const UserCard = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(true);

  // Sample dynamic data (replace with your actual data source)
  const cardData = {
    batchId: "BTC-45678",
    articleName: "Phantom",
    orderId: "ORD-98765",
    defectStatus: "Defects"
  };

  // Timer functionality
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1500);

    // Start with 2 hours timer
    let totalSeconds = 2 * 60 * 60;

    const timer = setInterval(() => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTime({ hours, minutes, seconds });

      if (totalSeconds > 0) {
        totalSeconds -= 1;
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time for display
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <>
      <Card style={{ borderRadius: '24px', minHeight: '300px', maxHeight: 'auto', backgroundColor: "#84CDA7", border: "3px solid rgba(255, 255, 255, 1)" }} >
        <CardBody className='pt-4'>
          {loading ? (
            <div className="text-center mt-5">
              <Loader3 />
            </div>
          ) : (
            <>
              <div className="d-flex align-items-center mb-3">
                <Clock size={18} color="#335436" className="me-1" />
                <p className='ellipsis-text mb-0' style={{ fontSize: '14px', color: '#335436', fontWeight: '500' }}>
                  Timer:
                  <Badge color="light" className="ms-1" style={{ color: '#335436', backgroundColor: "#84CDA7 !important" }}>
                    {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
                  </Badge>
                </p>
              </div>

              <div className="d-flex align-items-center mb-3">
                <Box size={18} color="#335436" className="me-1" />
                <p className='ellipsis-text mb-0' style={{ fontSize: '14px', color: '#335436', fontWeight: '500' }}>
                  Batch-ID:
                  <span className="ms-1">{cardData.batchId}</span>
                </p>
              </div>

              <div className="d-flex align-items-center mb-3">
                <FileText size={18} color="#335436" className="me-1" />
                <p className='ellipsis-text mb-0' style={{ fontSize: '14px', color: '#335436', fontWeight: '500' }}>
                  Article Name:
                  <span className="ms-1">{cardData.articleName}</span>
                </p>
              </div>

              <div className="d-flex align-items-center mb-3">
                <ShoppingBag size={18} color="#335436" className="me-1" />
                <p className='ellipsis-text mb-0' style={{ fontSize: '14px', color: '#335436', fontWeight: '500' }}>
                  Order-ID:
                  <span className="ms-1">{cardData.orderId}</span>
                </p>
              </div>

              <div className="d-flex align-items-center mb-3">
                <AlertCircle size={18} color="#335436" className="me-1" />
                <p className='ellipsis-text mb-0' style={{ fontSize: '15px', color: '#335436', fontWeight: '500' }}>
                  Defect Status:
                  <Badge color={cardData.defectStatus === "No Defects" ? "success" : "danger"} className="ms-1" pill>
                    {cardData.defectStatus}
                  </Badge>
                </p>
              </div>

              {/* Uncomment if needed
            <div className='d-flex align-items-center'>
              <p style={{ color: '#335436', fontSize: '13px', marginTop: "-5px", textWrap: "wrap" }}>
                Lorem Ipsum is simply text of the printing and typesetting
              </p>
            </div>
            
            <button className="btn text-white px-4 py-3 shadow-sm mt-3" style={{ backgroundColor: "#84CDA7", color: "#FFFFFF", fontSize: "15px", border: "1px solid #FFFFFF" }}>
              View Profile
            </button>
            */}
            </>
          )}
        </CardBody>
      </Card>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <TimerButtons />
        </Col>
      </Row>
    </>
  );
};

export default UserCard;