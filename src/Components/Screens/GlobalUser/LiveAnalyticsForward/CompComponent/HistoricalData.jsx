import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const HistoricalDataChart = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState('Article name');

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const data = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 150 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 200 },
    { name: 'May', value: 350 },
    { name: 'Jun', value: 340 },
    { name: 'Jul', value: 340 },
    { name: 'Aug', value: 340 },
    { name: 'Sep', value: 340 },
    { name: 'Oct', value: 340 },
    { name: 'Nov', value: 340 },
    { name: 'Dec', value: 340 }
  ];

  const CustomDot = (props) => {
    const { cx, cy } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#4ECDC4"
        stroke="#4ECDC4"
        strokeWidth={2}
      />
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card style={{
            background: '#141E2B',
            border: '0.5px solid rgb(37, 37, 37)',
            borderRadius: '12px',
            boxShadow: '0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.6)'
          }}>
            <CardBody style={{ padding: '15px' }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                marginBottom: '30px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <h5 style={{
                    color: '#b0b8c1',
                    fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.4rem',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '0',
                  }}>
                    HISTORICAL DATA
                  </h5>

                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                      caret
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#FFFFFF',
                        fontSize: '14px',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        minWidth: '130px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {selectedArticle}
                    </DropdownToggle>
                    <DropdownMenu style={{
                      backgroundColor: '#252830',
                      border: '1px solid #3a3f4b',
                      borderRadius: '4px'
                    }}>
                      <DropdownItem
                        onClick={() => setSelectedArticle('Article name')}
                        style={{
                          color: '#FFFFFF',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Article name
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => setSelectedArticle('Another article')}
                        style={{
                          color: '#FFFFFF',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Another article
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>

              {/* Checkbox */}
              <div style={{ marginBottom: '40px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#8892b0',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{
                      marginRight: '10px',
                      accentColor: '#4ECDC4'
                    }}
                  />
                  Android
                </label>
              </div>

              {/* Chart Container with Horizontal Scroll */}
              <div style={{ 
                width: '100%',
                overflowX: 'auto',
                overflowY: 'hidden'
              }}>
                <div style={{ 
                  minWidth: '600px',
                  height: window.innerWidth <= 768 ? '250px' : '300px',
                  width: '100%'
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: '#8892b0',
                          fontSize: window.innerWidth <= 768 ? 10 : 12,
                          fontWeight: '400'
                        }}
                        dy={10}
                        interval={0}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: '#8892b0',
                          fontSize: window.innerWidth <= 768 ? 10 : 12,
                          fontWeight: '400'
                        }}
                        domain={[0, 400]}
                        ticks={[0, 100, 200, 300, 400]}
                        dx={-10}
                      />
                      <Line
                        type="linear"
                        dataKey="value"
                        stroke="#4ECDC4"
                        strokeWidth={2}
                        dot={<CustomDot />}
                        activeDot={{
                          r: 6,
                          fill: '#4ECDC4',
                          stroke: '#4ECDC4',
                          strokeWidth: 2
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Mobile Scroll Indicator */}
                {window.innerWidth <= 768 && (
                  <div style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#6b7280',
                    marginTop: '10px',
                    marginBottom:"5px"
                  }}>
                    Scroll horizontally to see all months →
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HistoricalDataChart;