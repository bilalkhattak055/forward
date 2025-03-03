// 
import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { IoAddOutline } from "react-icons/io5";
import { GrSubtract } from "react-icons/gr";
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import './livealerts.css'

const ImageZoom = ({ photo, setIsOpen, setShowModal, imageData, cameraTable }) => {
  const [zoomLevel, setZoomLevel] = useState(1); // State to keep track of the zoom level
  const [modalWidth, setModalWidth] = useState('80%'); // Default width of modal
  const [modalHeight, setModalHeight] = useState('80%'); // Default width of modal

  const closeModal = () => {
    setIsOpen(false);
    setShowModal(false);
    console.log('closing');
  };

  // Handle window resize for responsive modal
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
       if(width < 450){
        setModalWidth('90%'); // For smaller screens, make it 95% of the viewport
        setModalHeight('50vh')
      }
      else if(width < 700) {
        setModalWidth('90%'); // For smaller screens, make it 95% of the viewport
        setModalHeight('70vh')
      }
      
      else {
        setModalWidth('90%'); // For larger screens, keep it 80% of the viewport
        setModalHeight('90vh')

      }
    };

    // Initial check when component mounts
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

 

  return (
    <>
     <Modal
  style={{
    zIndex: 1000,
    height:modalHeight,
    width: modalWidth, // Dynamically set the width based on screen size
    maxWidth: 'none', // Prevent Bootstrap from capping width at default sizes
    padding: '0px',
   // Center the modal horizontally
    position: 'relative',
    top: '50%', // Adjust for centering vertically
    transform: 'translateY(-50%)', // Ensure the modal is vertically centered
  }}
  className='modalclass'
  isOpen={true}
  toggle={closeModal}
  centered={true}
  backdrop={true}
>
        <ModalBody style={{ padding: '0px', overflow: 'hidden',width:'90vw' }}>
          <div className='p-0 m-0' style={{ position: 'relative', height: '100%', width: '100%' }}>
            <TransformWrapper initialScale={1}>
           
            {({ zoomIn, zoomOut, resetTransform }) => (
                <>           
                
                <div
              style={{
                overflow: 'hidden', // Hide overflow content outside the container
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none', // Prevent image selection
              }}
            >
                <TransformComponent> 
              <img
                style={{
                //   transform: `scale(${zoomLevel})`,
                //   transformOrigin: 'center', // Ensure the image scales from the center
                //   transition: 'transform 0.3s ease-in-out', // Smooth zooming transition
                  maxWidth: '100%',
                  maxHeight: modalHeight,
                //   minWidth:'100%',
                  width: '100vw',
                  height: modalHeight
                
                }}
                src={photo}
                alt="Zoomed"
              />
                </TransformComponent>
            </div>

            {/* Zoom controls */}
            <div
              className="p-2"
              style={{
                width: '200px',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '15px',
                maxWidth: '270px',
                position: 'absolute',
                top: '10px',
                right: '10px',
                userSelect: 'none', // Prevent selection of controls
              }}
            >
              <div className="p-0 m-0 d-flex align-items-center" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={()=>zoomIn()}>
                <IoAddOutline style={{ color: 'white', cursor: 'pointer' }} />
              </div>
              <div className="p-0 m-0 d-flex align-items-center" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={()=>zoomOut()}>
                <GrSubtract style={{ color: 'white', cursor: 'pointer' }} />
              </div>

              <button className="btn btn-outline-warning btn-sm rounded-5" onClick={()=>resetTransform()}>
                Reset
              </button>
            </div>

            {/* Dark overlay with details */}
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                bottom: '0',
                left: '0',
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent dark background
                color: 'white',
                padding: '20px',
              }}
            >
              {imageData.cameraName && <h4 className='' style={{ margin: 0 }}>Camera Name: {imageData.cameraName}</h4>}
              {imageData.violation && <p className='' style={{ margin: '5px 0' }}>Violation: {imageData.violation}</p>}
              {imageData.date && <p className='' style={{ margin: '5px 0 0 0' }}>{cameraTable ? "Last Active:" : ''} {imageData.date}</p>}
              {imageData.time && <p className='' style={{ margin: '' }}> {imageData.time}</p>}
            </div>
          
            </>

            )}
            </TransformWrapper>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ImageZoom;



