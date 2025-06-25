import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import AIAccuracy from "./CompComponent/AIAccuracy";
import { LiveImage } from "./CompComponent/LiveImage";
import HistoricalDataChart from "./CompComponent/HistoricalData";
import LatestDefectImages from "./CompComponent/LatestDefectImage";
import CombineComponent from "./CompComponent/CombineComponent";

export default function ComingSoonPage() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Special layout for 1380 to 1200
  if (screenWidth <= 1380 && screenWidth >= 1200) {
    return (
      <Container fluid className="pt-5">
        <Row>
          <Col xl={12}>
            <AIAccuracy />
          </Col>
          <Col xl={12}>
            <CombineComponent />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="pt-5">
      <Row>
        <Col lg={12} xl={3}>
          <AIAccuracy />
        </Col>
        <Col lg={12} xl={9}>
          <CombineComponent />
        </Col>
      </Row>
    </Container>
  );
}
