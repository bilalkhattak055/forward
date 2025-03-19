import React, { useState, useEffect } from 'react';
import UserCard from './Components/UserCard';
import InspectedCard from './Components/InspectedPannelCard';
import OkayCard from './Components/OkayPannelCard';
import DefectedPanelsCard from './Components/DefectedPanelCard';
import TotalPanel from './Components/TotalPannel';
import LiveImage from './Components/Camera';
import LatestDefectImage from './Components/DefectedImage';
import TimerButtons from './Components/TimeButton';
import { Row, Col, Container, Collapse } from 'reactstrap';

const LiveAnalyticsForward = () => {
    const defectImages = [
        { url: 'https://living2022.com/media/images/Womens_Football_Match_.width-1320.height-990.format-jpeg.jpg' },
        { url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/11/06/thumbs_b_c_c0f3083541183d22ac6e9ff1e20963bf.jpg?v=023244' },
        { url: 'https://images.indianexpress.com/2018/07/football-reuters-m.jpg?w=414' },
        { url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/11/06/thumbs_b_c_c0f3083541183d22ac6e9ff1e20963bf.jpg?v=023244' },
        { url: 'https://images.indianexpress.com/2018/07/football-reuters-m.jpg?w=414' },
        { url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/11/06/thumbs_b_c_c0f3083541183d22ac6e9ff1e20963bf.jpg?v=023244' },
        { url: 'https://images.indianexpress.com/2018/07/football-reuters-m.jpg?w=414' },
        { url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/11/06/thumbs_b_c_c0f3083541183d22ac6e9ff1e20963bf.jpg?v=023244' },
        { url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/11/06/thumbs_b_c_c0f3083541183d22ac6e9ff1e20963bf.jpg?v=023244' },
        { url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/11/06/thumbs_b_c_c0f3083541183d22ac6e9ff1e20963bf.jpg?v=023244' },
        { url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/11/06/thumbs_b_c_c0f3083541183d22ac6e9ff1e20963bf.jpg?v=023244' },
        { url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/11/06/thumbs_b_c_c0f3083541183d22ac6e9ff1e20963bf.jpg?v=023244' },
        { url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/11/06/thumbs_b_c_c0f3083541183d22ac6e9ff1e20963bf.jpg?v=023244' },
    ];
    
    const smallScreenStyle = {
        containerHeight: '350px', 
        imageHeight: '280px',       
        placeholderCount: 2       
      };

      const mediumScreenStyle = {
        containerHeight: '120px', 
        imageHeight: '100px',       
        placeholderCount: 1       
      };


    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1300);
    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth > 767 );


    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1300); 
            setIsMediumScreen(window.innerWidth > 767);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); 

    return (
        <Container fluid className="pt-4 mt-2">
            {isLargeScreen ? (
                <>
                    <Row>
                        <Col xl={3}>
                            <UserCard />
                        </Col>
                        <Col  xl={3}>
                            <InspectedCard className="mb-3" />
                            <OkayCard />
                        </Col>
                        <Col xl={3}>
                            <DefectedPanelsCard />
                        </Col>
                        <Col  xl={3}>
                            <TotalPanel />
                        </Col>
                        <Col>
                            <TimerButtons/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8} lg={9}>
                            <LiveImage />
                        </Col>
                        <Col>
                            <LatestDefectImage images={defectImages} />
                        </Col>
                    </Row>
                </>
            )  : isMediumScreen ? (
                <>
                  <Row>
                        <Col md={4} lg={4} xl={4}>
                            <UserCard />
                        </Col>
                        <Col md={3} lg={4} xl={4}>
                            <InspectedCard className="mb-3" />
                            <OkayCard />
                        </Col>
                        <Col md={5} lg={4} xl={4}>
                            <DefectedPanelsCard />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={7} xl={8}>
                            <LiveImage cardHeight='610px'/>
                        </Col>
                        <Col md={5} xl={4}>
                            <TotalPanel />
                            <div >
                                <LatestDefectImage images={defectImages} style={mediumScreenStyle} />
                            </div>
                        </Col>
                    </Row>
                </>
              ):  (
                <>
                    <Row>
                        <Col md={4} lg={4} xl={4}>
                            <UserCard />
                        </Col>
                        <Col  sm={6} md={3} lg={4} xl={4}>
                            <InspectedCard />                
                        </Col>
                        <Col sm={6} md={3} lg={4} xl={4}>
                        <OkayCard />
                        </Col>
                        <Col md={5} lg={4} xl={4}>
                            <DefectedPanelsCard />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={7} xl={8}>
                            <LiveImage cardHeight='400px' imgHeight='300px'/>
                        </Col>
                        <Col md={5} xl={4}>
                            <TotalPanel />
                            <div >
                                <LatestDefectImage images={defectImages} style={smallScreenStyle} />
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default LiveAnalyticsForward;