
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {LiveImage} from './LiveImage';
import HistoricalDataChart from './HistoricalData';
import LatestDefectImages from './LatestDefectImage';

const CombineComponent = () => {
    return (
        <Container fluid>
            <Row>
                <Col xl={4}>
                    <LiveImage/>
                </Col>
                <Col xl={8}>
                    <HistoricalDataChart/>
                </Col>
            </Row>
            <Row>
            <Col xl={12}>
                    <LatestDefectImages/>
            </Col>
            </Row>
        </Container>
    )
}
export default CombineComponent;