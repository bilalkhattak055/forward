import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Clock } from "lucide-react"
import Crash from './asset/wip.png'

export default function ComingSoonPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", backgroundColor: "#f8f9fa" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-lg">
              <CardBody className="p-5">
                <div className="text-center mb-4">
                  <div
                    style={{
                      backgroundColor: "#4CAF50",
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <Clock size={40} color="white" />
                  </div>
                </div>

                <h1 className="text-center mb-3" style={{ color: "#2E7D32", fontWeight: "bold" }}>
                  Aw, snap!
                </h1>
                <h3 className="text-center mb-4" style={{ color: "#388E3C" }}>
                  We are working on new things
                </h3>

                <p className="text-center mb-5" style={{ fontSize: "1.1rem" }}>
                  Very soon you will see them. Stay tuned for something amazing!
                </p>

                <div className="text-center">
                  <button
                    className="btn btn-lg px-4 py-2"
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "30px",
                    }}
                  >
                    Notify Me
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
