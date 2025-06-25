import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { LiveImage } from './LiveImage';
import HistoricalDataChart from './HistoricalData';
import LatestDefectImages from './LatestDefectImage';

const CombineComponent = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1560);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1560);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Decide column sizes based on screen size
    const liveImageCol = isLargeScreen ? 4 : 12;
    const historicalChartCol = isLargeScreen ? 8 : 12;

    return (
        <Container fluid>
            <Row>
                <Col xl={liveImageCol} lg={12}>
                    <LiveImage />
                </Col>
                <Col xl={historicalChartCol} lg={12}>
                    <HistoricalDataChart />
                </Col>
            </Row>
            <Row>
                <Col xl={12} lg={12}>
                    <LatestDefectImages />
                </Col>
            </Row>
        </Container>
    );
};

export default CombineComponent;
