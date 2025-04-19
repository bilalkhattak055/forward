import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { CardTitle, Row, Col } from 'reactstrap';

const ComplianceTargetsChart = ({ loading = false }) => {
  // Dummy data
  const dummyData = {
    series: [
      {
        name: 'Defected Panels',
        data: [120, 85, 35, 12],
      }
    ],
    categories: ['Printing', 'Material', 'Touching', 'Cutting'],
  };

  const options = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 4,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
      width: 0,
    },
    xaxis: {
      title: {
        text: "Panels",
        style: {
          fontSize: '16px',
          color: '#8C8C8C',
          fontWeight: 500,
          fontFamily: 'Arial, sans-serif'
        },
      },
      categories: dummyData.categories,
      labels: {
        style: {
          fontSize: '12px',
          colors: '#666666',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: 'Number of Defects',
        style: {
          fontSize: '14px',
          color: '#8C8C8C',
          fontWeight: 500,
          fontFamily: 'Arial, sans-serif'
        },
      },
      labels: {
        style: {
          fontSize: '12px',
          colors: '#666666',
        },
        formatter: function (val) {
          return Math.round(val);
        },
      },
      min: 0,
      max: 150,
      tickAmount: 4,
    },
    colors: ['#00A04A'], 
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        radius: 12,
      },
    },
    grid: {
      borderColor: '#e7e7e7',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '90%',
            },
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '10px',
              },
            },
          },
        },
      },
    ],
  };

  return (
    <Row style={{
      borderRadius: '20px',
      border: '1px solid #ECECEC',
      backgroundColor: "#FDFEFF",
    }}>
      <Col>
        <CardTitle tag="h5" className="text-center mt-2">
          Defected Panels
        </CardTitle>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <ReactApexChart options={options} series={dummyData.series} type="bar" height={360} />
        )}
      </Col>
    </Row>
  );
};

export default ComplianceTargetsChart;