import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Input } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import Loader3 from '../../../../../../CommonElements/Spinner/loader3';
import '../style/style.css';

export default function Component({ seriess,height,tooltip }) { 
  function getCurrentWeekdata() {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const pastDaysOfYear = (currentDate - startOfYear) / 86400000; 
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  }

  const [currentweek, setcurrentweek] = useState(getCurrentWeekdata());
  const [selectedWeeks, setSelectedWeeks] = useState(getCurrentWeekdata());
  const [series, setSeries] = useState([80, 20]); // Default dummy data

  // console.log(,'curent seires')
  useEffect(() => {
    if (seriess && seriess.length > 0) {
       
      // const activeValue = seriess[0] ?? 0;
      // setSeries([activeValue, 100 - activeValue]);
      setSeries([parseInt(seriess[0]),100-(parseInt(seriess[0]))])
    } else { 
      setSeries([0, 0]); 
    }
  }, [seriess]); 
  const chartOptions = {
    chart: {
      type: 'donut',
      height: 240,
    },
    series: series,
    labels: ['Over all compliance', 'Non compliance'],
    colors: ['#175fa4', '#dde8f9'],
    plotOptions: {
      pie: {
          startAngle: 0, // Ensures no gap at the top
          endAngle: 360, // Completes the circle
        donut: {
          size: '60%',
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: '26px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              color: '#595959',
              formatter: function (val) {
                return val + '%';
              }
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              color: '#595959',
              formatter: function () {
                return series[0] + '%';
              }
            }
          }
        },
      }
    },
    stroke: { show: false },
    tooltip: {
      enabled: true,
      custom: function({ seriesIndex, w }) {
        if (tooltip && tooltip.length > 0) {
          // Generate HTML with line breaks for tooltip
          const tooltipContent = tooltip.map(item => `<div>${item.name}: ${item.name=='Machine Guard' || item.barValue==-1 ?'N/A':item.barValue}</div>`).join('');
          return `<div style="padding: 5px; font-size: 12px; line-height: 1.5; color: #ffffff;">
                    ${tooltipContent}
                  </div>`;
        }
        return '<div style="padding: 5px; font-size: 12px; color: #ffff;">No data</div>';
      }
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    responsive: [
      {
        breakpoint: 1400,
        options: {
          chart: { width: '200px', height: '240px' },
        },
      },
      {
        breakpoint: 1024,
        options: {
          chart: { width: '80%', height: '240px' },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: { width: '100%', height: '240px' },
        },
      },
    ],
  };

  const handleWeekChange = (event) => {
    setSelectedWeeks(event.target.value);
  };

console.log(tooltip,'tooltip data')

  return (
    <Card className='p-0 m-0' style={{ boxShadow: 'none' }}>
      {seriess?.length <= 0 ? (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '50vh' }}>
          No data available
        </div>
      ) : (
        <> 
          <div >
            <ReactApexChart
              options={chartOptions}
              // series={series}
              series={series}
              type="donut"
              height={chartOptions.chart.height}
            /> 
          </div>
        </>
      )}
    </Card>
  );
}