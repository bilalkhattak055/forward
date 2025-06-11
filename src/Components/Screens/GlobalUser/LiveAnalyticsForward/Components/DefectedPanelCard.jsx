import React, { useEffect } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Green from '../asset/greenarrow.svg';
import bulb from '../asset/bulb.svg';
import PannelData from "../Zustand/DataSender";

const DefectedPanelsCard = () => {
  const DefectedPannel = PannelData((state) => state.defectedPanels);
  const DefectedType = PannelData((state) => state.defectedType);
  const ConnectionSocket = PannelData((state) => state.connectSocket);

  useEffect(() => {
    ConnectionSocket();
  }, [ConnectionSocket]);

  const defectTypes = Object.entries(DefectedType).map(([key, value]) => {
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    const highestValue = Math.max(...Object.values(DefectedType).map(v => 
      typeof v === 'string' ? parseInt(v, 10) : v
    ));
    
    return {
      label: key,
      value: value,
      isActive: numValue === highestValue && numValue > 0,
      color: numValue === highestValue && numValue > 0 ? "#00A04A" : "#52526CCC"
    };
  });
      
  return (
    <Card
      style={{
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        border: "none",
        height: "297px",
      }}
    >
      <CardBody>
        <Row>
          <Col xs={8} style={{ position: "relative" }}>
            
            <div
              style={{
                position: "absolute",
                display: "flex",
                left: "6px",
                top: "16px",
                height: "240px",
                width: "2px",
                backgroundColor: "#D9D9D9",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              {/* Horizontal Line */}
              <div
                style={{
                  width: "16px",
                  height: "2px",
                  backgroundColor: "#D9D9D9",
                  position: "absolute",
                  left: "-5px",
                  top: "50%",
                  transform: "translateY(-50%)"
                }}
              />

              {/* Green Arrow (Fixed Position) */}
              <div style={{ position: "absolute", left: "6px", top: "50%", transform: "translateY(-50%)" }}>
                <img src={Green} alt="Green arrow" style={{ width: "12px", height: "12px" }} />
              </div>

              {/* Title */}
              <h6
                className='ellipsis-text'
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#67687A",
                  marginLeft: "18px",
                  marginTop: "10px",
                  whiteSpace: "nowrap"
                }}
              >
                Defected Panels
              </h6>

              {/* Bulb Icon (Fixed Position) */}
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, rgba(1, 161, 78, 0.2), rgba(0, 160, 74, 0))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  right: "-88px",
                  top: "-5px"
                }}
              >
                <img src={bulb} alt="Bulb icon" />
              </div>
            </div>

            {/* Big Number */}
            <h1 style={{ fontSize: "38px", fontWeight: "700", margin: "17px 0" }}>
              {DefectedPannel}
            </h1>

            {/* Defect List - Using the processed data */}
            <div style={{ marginTop: "22px", position: "relative" }}>
              {defectTypes.map((item, index) => (
                <Row key={index} style={{ alignItems: "center", marginBottom: "9px" }}>
                  {/* Horizontal Connector */}
                  <Col xs={2}>
                    <div
                      style={{
                        width: "16px",
                        height: "2px",
                        backgroundColor: "#D9D9D9",
                        position: "relative",
                        left: "-4px",
                      }}
                    />
                    {item.isActive ? (
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          backgroundColor: item.color,
                          borderRadius: "50%",
                          position: "relative",
                          top: "-4px",
                          right: "8px"
                        }}
                      />
                    ) : (
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", visibility: "hidden" }} />
                    )}
                  </Col>

                  {/* Label */}
                  <Col xs={5} style={{ paddingLeft: 0, top: "-3px" }}>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: item.color || "#52526CCC",
                        whiteSpace: "nowrap",
                        display: "inline-block"
                      }}
                    >
                      {item.label}
                    </span>
                  </Col>

                  {/* Value */}
                  <Col xs={4} style={{ textAlign: "right", top: "-3px" }}>
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.value}
                    </span>
                  </Col>
                </Row>
              ))}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default DefectedPanelsCard;