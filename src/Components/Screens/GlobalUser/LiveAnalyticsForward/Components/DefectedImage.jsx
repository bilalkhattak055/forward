import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Spinner } from 'reactstrap';
import ImageZoom from '../../../../Dashboards/AreaDashbaord/reports/Components/LiveAlertsCards/ImageZoom';

const LatestDefectImage = ({ images = [], style }) => {
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
 const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      const timer = setTimeout(() => {
        setLoadedImages(images);
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [images]);

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setIsOpen(true);
  };

  return (
    <Card className="shadow " style={style}>
      <CardBody>
        <CardTitle tag="h6" className="mb-3">Latest Defect Image</CardTitle>

        <div className="defect-images-container" style={{
          height: style?.containerHeight || '500px',
          overflowY: 'auto',
          position: 'relative',
          paddingRight: '10px'
        }}>
          <style>{`
            .defect-images-container::-webkit-scrollbar {
              width: 6px;
            }
            .defect-images-container::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 8px;
            }
            .defect-images-container::-webkit-scrollbar-thumb {
              background: #4CAF50;
              border-radius: 8px;
            }
          `}</style>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner color="success" />
            </div>
          ) : (
            <>
              {loadedImages.length > 0 ? (
                loadedImages.map((image, index) => (
                  <div key={index} className="defect-image-item mb-3 transition-all" style={{
                    backgroundColor: '#f1f9f1',
                    borderRadius: '8px',
                    height: style?.imageHeight || '120px',
                    overflow: 'hidden',
                    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                    opacity: 1,
                    transform: 'translateY(0)',
                    animation: `fadeIn 0.5s ease-in-out ${index * 0.2}s`,
                  }}>
                    <img
                      src={image.url}
                      alt=""
                      className="img-fluid w-100 h-100"
                      style={{ objectFit: 'cover',cursor: 'pointer'}}
                      onError={handleImageError}
                      onClick={() => handleImageClick(image.url)}
                    />
                  </div>
                ))
              ) : (
                Array.from({ length: style?.placeholderCount || 4 }).map((_, index) => (
                  <div key={index} className="defect-image-item mb-2" style={{
                    backgroundColor: '#f1f9f1',
                    borderRadius: '8px',
                    height: style?.imageHeight || '100px',
                  }} />
                ))
              )}
            </>
          )}
        </div>

        {/* Only render modal when needed */}
        {isOpen && selectedImage && (
          <ImageZoom
            photo={selectedImage}
            setIsOpen={() => setIsOpen(false)}
            setShowModal={()=>setShowModal(false)}
            imageData="click"
          />
        )}

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </CardBody>
    </Card>
  );
};

export default LatestDefectImage;
