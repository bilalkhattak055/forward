import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { MonthlyProfitsChartData } from '../Dummy';

const TotalPanel = () => {
  return (
    <Card>
      <CardHeader className='card-no-border'>
        <h5>Total Panels</h5>
        <span style={{textWrap:"nowrap",fontWeight:500}}>Total Panels Collection Here</span>
      </CardHeader>
      <CardBody className=' text-center'>
        <div>
          <ReactApexChart 
            type='donut' 
            height={250} 
            series={MonthlyProfitsChartData.series} 
            options={MonthlyProfitsChartData.options} 
          />
        </div>

       
        <div className="legend-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#FB0C0C', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ fontSize: '14px', color: '#333', fontWeight: '500',marginTop:"3px" }}>Defected</span>
          </div>
          <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#FDA844', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ fontSize: '14px', color: '#333', fontWeight: '500',marginTop:"3px"  }}>Okay</span>
          </div>
          <div className="legend-item" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#54BA4A', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ fontSize: '14px', color: '#333', fontWeight: '500' ,marginTop:"3px" }}>Total</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TotalPanel;
