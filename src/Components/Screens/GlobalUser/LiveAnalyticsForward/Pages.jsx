import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Clock } from "lucide-react"
import AIAccuracy from "./CompComponent/AIAccuracy"
import {LiveImage} from "./CompComponent/LiveImage"
import HistoricalDataChart from "./CompComponent/HistoricalData"
import LatestDefectImages from "./CompComponent/LatestDefectImage"
import CombineComponent from "./CompComponent/CombineComponent"
export default function ComingSoonPage() {
  return (
  <>
  <Container fluid className="pt-5">
    <Row>
      <Col xl={3}>
        <AIAccuracy/>
      </Col>
      <Col xl={9}>
      <CombineComponent/>
      </Col>
    </Row>
  </Container>
    
  </>
  )
}
