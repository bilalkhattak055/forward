import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UEFA from '../asset/UEFA.png';
import Addidas from '../asset/Addidas.png';
import Nike from '../asset/Add.png';


const LatestDefectImages = () => {
  // Sample soccer ball images - in real app, these would come from props or API
  const images = [
    UEFA,
    Addidas,
    Nike,
    UEFA,
    Addidas,
    Nike,
    UEFA,
    Nike,
    UEFA,
    Addidas,
    UEFA,
  ];

  return (
    <div style={{
        background: '#141E2B',
        border: '0.5px solid rgb(37, 37, 37)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.6)',
        padding: '40px 0'
    }}>
      <Container fluid className="px-4">
        <Row>
          <Col>
            <h2 style={{
              color: '#b0b8c1',
              fontSize: '1.4rem',
              fontWeight: 500,
              letterSpacing: '1px',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '20px',
            }}>
              LATEST DEFECT IMAGES
            </h2>
            
            <div style={{
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'hidden',
              gap: '20px',
              paddingBottom: '10px',
              scrollBehavior: 'smooth'
            }}
            className="custom-scrollbar">
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: '200px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  <img
                    src={image}
                    alt={`Soccer ball ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'none',
                      display: 'block'
                    }}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .custom-scrollbar > div {
            min-width: 150px !important;
            width: 150px !important;
            height: 150px !important;
          }
        }
        
        @media (max-width: 480px) {
          .custom-scrollbar > div {
            min-width: 120px !important;
            width: 120px !important;
            height: 120px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LatestDefectImages;