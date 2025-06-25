import React from 'react';
import { Container,Row,Col } from 'reactstrap';
import adidas from '../asset/Addida.png'
import LatestDefectImages from './LatestDefectImage';
export const LiveImage = () => {
    return (
        <Container fluid>
        <Row>
        <Col>
        <div style={{ width: '100%' }}>
            {/* Live Feed Container */}
            <div className='p-2 mb-4'
                style={{
                    height: '460px',
                    background: '#141E2B',
                    border: '0.5px solid rgb(37, 37, 37)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.6)',
                    flexDirection: "column",
                    width: '100%'
                }}>

                {/* Image Container */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: "contain",
                            width: 'auto',
                            height: 'auto'
                        }}
                        src={adidas}
                        alt="Live Feed"
                    />
                </div>

                {/* Title */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <h6 style={{
                        color: "#b0b8c1",
                        fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                        fontWeight: "500",
                        fontFamily: 'Inter, sans-serif',
                        margin: 0,
                        textAlign: 'center'
                    }}>
                        LIVE FEED
                    </h6>
                </div>
            </div>
        </div>
        </Col>
        </Row>
        </Container>
    );
};
