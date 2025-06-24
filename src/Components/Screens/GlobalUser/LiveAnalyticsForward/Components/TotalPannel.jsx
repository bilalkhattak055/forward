import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';

const TotalPanel = () => {
  // State for chart data
  const [chartData, setChartData] = useState({
    series: [30, 35, 55], // Default values
    options: {
      labels: ["Defected", "Okay", "Total"],
      chart: {
        type: "donut",
        height: 300,
        dropShadow: {
          enabled: true,
          top: 3,
          left: 3,
          blur: 11.17,
          color: ' #FFFFFF',
          opacity: 0.4,
          background: "transparent"
        }
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: "bottom",
        fontSize: "14px",
        fontFamily: "Rubik, sans-serif",
        fontWeight: 500,
        labels: {
          colors: "#FFFFFF",
          useSeriesColors: false
        },
        markers: {
          width: 6,
          height: 6,
          offsetX: 0,
          offsetY: 0
        },
        itemMargin: {
          horizontal: 7,
          vertical: 0,
        },
        onItemClick: {
          toggleDataSeries: true
        },
        formatter: undefined
      },
      stroke: {
        width: 10,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "83%",
            background: "#141E2B",
            labels: {
              show: true,
              name: {
    
                color: "#FFFFFF", // Added color for name
                fontSize: "15px",
                fontFamily: "Rubik, sans-serif",
                fontWeight: 500,
              },
              value: {

                color: "#FFFFFF", // Added color for value
                fontSize: "15px",
                fontFamily: "Rubik, sans-serif",
                fontWeight: 600,
              },
              total: {
                show: true,
                fontSize: "20px",
                fontFamily: "Rubik, sans-serif",
                fontWeight: 500,
                color: "#FFFFFF !important", // Force white color with !important
                label: "Total Panels",
                formatter: () => "Total Panels",
              },
            },
          },
        },
      },
      tooltip: {
        enabled: true,
      },
      states: {
        normal: {
          filter: {
            type: "none",
          },
        },
        hover: {
          filter: {
            type: "none",
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
          },
        },
      },
      colors: ["#FB0C0C", "#FDA844", "#54BA4A"],
      responsive: [
        {
          breakpoint: 1630,
          options: {
            chart: {
              height: 360,
            },
          },
        },
        {
          breakpoint: 1584,
          options: {
            chart: {
              height: 400,
            },
          },
        },
        {
          breakpoint: 1473,
          options: {
            chart: {
              height: 250,
            },
          },
        },
        {
          breakpoint: 1425,
          options: {
            chart: {
              height: 270,
            },
          },
        },
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 300,
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250,
            },
          },
        },
      ],
    }
  });

  // State for additional data
  const [panelData, setPanelData] = useState({
    timestamp: '',
    totalPanels: 0,
    defectedPanels: 0,
    okayPanels: 0,
    defectTypes: {}
  });

  // WebSocket reference
  const wsRef = useRef(null);

  // Setup WebSocket connection
  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket('ws://localhost:8765');
    wsRef.current = socket;

    // Connection opened
    socket.addEventListener('open', (event) => {
      console.log('Connected to WebSocket server');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket data received:', data);
      
      // Update chart data
      if (data.chartData && data.chartData.series) {
        setChartData(prevState => ({
          ...prevState,
          series: data.chartData.series,
          options: {
            ...prevState.options,
            plotOptions: {
              ...prevState.options.plotOptions,
              pie: {
                ...prevState.options.plotOptions.pie,
                donut: {
                  ...prevState.options.plotOptions.pie.donut,
                  labels: {
                    ...prevState.options.plotOptions.pie.donut.labels,
                    total: {
                      ...prevState.options.plotOptions.pie.donut.labels.total,
                      label: `${data.totalPanels}`,
                      color: "#FFFFFF", // Ensure white color is maintained
                    },
                  },
                },
              },
            },
          }
        }));
      }

      // Update panel data
      setPanelData({
        timestamp: data.timestamp,
        totalPanels: data.totalPanels,
        defectedPanels: data.defectedPanels,
        okayPanels: data.okayPanels,
        defectTypes: data.defectTypes || {}
      });
    });

    // Handle errors
    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });

    // Handle disconnection
    socket.addEventListener('close', (event) => {
      console.log('Disconnected from WebSocket server', event);
    });

    // Clean up function
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, []);

  // Format timestamp for display
  const formattedTimestamp = panelData.timestamp 
    ? new Date(panelData.timestamp).toLocaleTimeString() 
    : '';

  return (
    <Card style={{backgroundColor:"#141E2B"}}>
      <CardHeader className='card-no-border' style={{backgroundColor:"#141E2B"}}>
        <div className="d-flex justify-content-between align-items-center" >
          <div>
            <h5 style={{color:"#FFFFFF"}}>Performance Pi-Chart</h5>
            <span style={{textWrap:"nowrap",fontWeight:500,color:"#FFFFFF"}}>Last updated: {formattedTimestamp}</span>
          </div>
        </div>
      </CardHeader>
      <CardBody className='text-center'>
        <div>
          <ReactApexChart
            type='donut'
            height={250}
            series={chartData.series}
            options={chartData.options}
          />
        </div>
        <div className="legend-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#FB0C0C', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '500'}}>Defected</span>
          </div>
          <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#FDA844', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '500' }}>Okay </span>
          </div>
          <div className="legend-item" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#54BA4A', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '500' }}>Total</span>
          </div>
        </div>
        
        {/* Add defect type breakdown if needed 
        {Object.keys(panelData.defectTypes).length > 0 && (
          <div className="defect-types mt-3 pt-2" style={{borderTop: '1px solid #eee'}}>
            <h6 className="mb-2">Defect Types</h6>
            <div className="d-flex flex-wrap justify-content-center">
              {Object.entries(panelData.defectTypes).map(([type, count]) => (
                <div key={type} className="mx-2 mb-1">
                  <span style={{fontSize: '13px', color: '#333'}}>
                    {type}: <strong>{count}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        */}
      </CardBody>
    </Card>
  );
};

export default TotalPanel;