import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Row, Col, Container } from 'reactstrap';
import Football from "../asset/Football.png"

const LiveImage = ({style, cardHeight = "556px",imgHeight="480px" }) => {
    const cardStyle = {
        height: cardHeight,
        ...style 
    };
    const image={
        height: imgHeight,
    }
    return(
        <>
        
        <Card className="shadow" style={cardStyle}>
            <CardBody>
                <CardTitle tag="h5" className="mb-3">Live Camera Image</CardTitle>
                <Row>
                    {/* Left Side - Camera Feed Section */}
                    <Col md={12} className="position-relative shadow-md">
                        <div 
                            className="border rounded bg-light mb-2 border-none" 
                            style={{
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                cursor: 'pointer'
                            }}
                            
                        >
                            {/* Image container */}
                            <img
                                src={Football}
                                alt="Product"
                                className="img-fluid rounded"
                                style={{
                                    width: '100%',
                                    height: image.height,
                                    objectFit: 'contain',
                                    backgroundColor: '#f8f9fa'
                                }}
                            />
                        </div>

                    </Col>

                </Row>
            </CardBody>
        </Card>
    
        
        {/* 
        {showZoomModal && selectedImage && (
            <ImageZoom 
                photo={selectedImage}
                setIsOpen={setShowZoomModal}
                setShowModal={setShowZoomModal}
                imageData={imageData}
                cameraTable={true}
            />
        )}
            ImageZoom Modal */}
        </>
    )
}
export default LiveImage;