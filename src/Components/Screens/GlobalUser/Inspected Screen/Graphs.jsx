import React from 'react';
import ComplianceTargetsChart from '../Target and Controal V2/Component/ComplianceTarget';
import AlertCountsChart from '../Target and Controal V2/Component/AlertCount';
import { Container, Row, Col } from 'reactstrap';


const Graphs = () => {
  return (
    <Container fluid className="py-3">
      <Row>
        <Col xs={12} lg={5}>
          <div className="p-3">
            <ComplianceTargetsChart/>
          </div>
        </Col>
        <Col xs={12} lg={7}>
          <div className="p-3">
            <AlertCountsChart/>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Graphs;
