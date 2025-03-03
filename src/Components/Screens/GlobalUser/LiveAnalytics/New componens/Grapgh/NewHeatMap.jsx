import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap"
import ReactApexChart from "react-apexcharts";
import '../style/style.css'
import { TbPoint } from "react-icons/tb";
import Loader3 from '../../../../../../CommonElements/Spinner/loader3'
import { useNavigate } from 'react-router';
import { errorToast } from '../../../../../../_helper/helper';

export default function Component({ heatmapData, moduleLength,loader,filters,AreaDashboard }) { 
  const navigate = useNavigate();
  
  const [series, setseries] = useState([
    {
      name: 'Person Available Alert',
      data: [40, 10, 3,]
    },
    {
      name: 'Grouping',
      data: [50, 15, 7,]
    },
    {
      name: 'No Go Area',
      data: [0, 0, 0,]
    },
    {
      name: 'Machine Visiting',
      data: [0, 0, 0,]
    },
    {
      name: 'Machine Guard',
      data: [1, 6, 10,]
    },
    {
      name: 'Supervisor Presence',
      data: [6, 10, 4,]
    },


  ])
 
  const options={
    chart: {
      type: 'heatmap',
      width: '100%',  // Responsive width
      toolbar: {
        show: false
      },
      events:{
        dataPointSelection: function (event, chartContext, { dataPointIndex, seriesIndex, w }) {
          try {
            console.log("Data point clicked")
          const value = w.globals.series[seriesIndex][dataPointIndex];
          const xAxisValue = heatmapData?.areas[dataPointIndex];
          // const xAxisValue = formattedCategories[dataPointIndex];
          const yAxisValue = chartContext.w.config.series[seriesIndex].name;
          const subArea = '';
          // const subArea = subAreas[dataPointIndex];
          console.log('x value', xAxisValue)
          console.log('y value', chartContext.w.config.series[seriesIndex].name)
          console.log('sub value', subArea);
          console.log(filters)
          // Store in localStorage
          localStorage.setItem('xAxisValue', JSON.stringify(xAxisValue));
          localStorage.setItem('yAxisValue', JSON.stringify(yAxisValue));
          localStorage.setItem('subValue', JSON.stringify(subArea));
          localStorage.setItem('heatmapfilters', JSON.stringify(filters)); 
          const role = JSON.parse(localStorage.getItem('role')); 
          navigate(`${process.env.PUBLIC_URL}/dashboard/default/alerts/${role}`);
          } catch (error) {
            errorToast('Something went wrong')
          }
          
        },
      },
      background: '#fff',
      fontFamily: 'inherit',
      // Add responsive array to handle specific configurations under 800px
      responsive: [{
        breakpoint: 800,
        options: {
          chart: {
            width: 600  // Set minimum width at this breakpoint
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '10px'  // Reduce font size for labels under 800px
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '10px'  // Reduce font size for labels under 800px
              }
            }
          },
          dataLabels: {
            style: {
              fontSize: '10px'  // Reduce font size for data labels under 800px
            }
          }
        }
      }]
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 100,
        colors: ['#1e293b'],

      }
    },
    xaxis: {
      // categories: ['MOULDING','STORE','Ali Pump'],
      categories:  heatmapData.areas?.map((area, index) => {
        const label = `${area}, ${heatmapData.areaOwner[index]}`;
        // return label.length > 10 ? `${label.substring(0, 10)}...` : label; 
        return label;
      }),
      // categories: heatmapData.areas.map((area, index) => `${area} (${heatmapData.areaOwner[index]})`),
      // categories: [
      //   'AO-02 Aftab',
      //   'AO-03 Arsalan',
      //   'AO-06 Meraj',
      //   'AO-07 Moa..',
      //   'AO-08 Shah',
      //   'AO-10 Nazir',
      //   'AO-12 Shafiq',
      //   'AO-14 Shah',
      //   'AO-14 Sheraz'
      // ],
      labels: {
        style: {
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },


    yaxis: {
      // categories: ['Vest', 'Helmet'],
      categories: heatmapData?.data.map(item => item.name),
      labels: {
        style: {
          fontSize: '12px',
        }
      }
    },
    plotOptions: {
      heatmap: {
        enableShades: false,
        shadeIntensity: 0.5,
        distributed: true,
        radius: 10,
        padding: 5,
        colorScale: {
          ranges: [
            {
              from: -1,
              to: -1,
              name: ' ',
              color: '#f6f6f6',
              foreColor: '#f6f6f6'
            },
            {
              from: 0,
              to: 0,
              name: ' ',
              color: '#dde8f9',
              foreColor: 'black'
            },
            {
              from: 1,
              to: 10,
              name: 'Normal',
              color: '#dde8f9',
              foreColor: '#000000'
            },
            {
              from: 11,
              to: 20,
              name: 'Serious',
              color: '#86ADE9',
              foreColor: '#000000'
            },
            {
              from: 21,
              to: 30,
              name: 'Trouble',
              color: '#1e67d6',
              foreColor: '#ffffff',
            },
            {
              from: 31,
              to: 10000000000000,
              name: 'Critical',
              color: '#175fa4', // Color for all values >= 31
              foreColor: '#ffffff'
            }
          ]
        }
      }
    },
    
    grid: {
      show: false
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: true,
      tooltip: {
        enabled: true,
        events: { 
        theme: 'light',
        x: {
          show: true
        },
        y: {
          formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
            const areaName = heatmapData?.areaOwner[dataPointIndex];
            return `${value} <span  className='m-0 p-0' style={{fontSize:'10px',fontWeight:'lighter'}} >
            alerts</span>  
            , ${areaName}`;
          },
          
        }
      }
    },
  
      theme: 'light',
      x: {
        show: true
      },
      y: {
        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
          const areaName = heatmapData?.areaOwner[dataPointIndex];
          return `${value} <span  className='m-0 p-0' style={{fontSize:'10px',fontWeight:'lighter'}} >
          alerts</span>  
          , ${areaName}`;
        },
        
      }
    }
  }
  const options2={
    chart: {
      type: 'heatmap',
      width: '100%',  // Responsive width
      toolbar: {
        show: false
      }, 
      events:{
        dataPointSelection: function (event, chartContext, { dataPointIndex, seriesIndex, w }) {
          try {
            const value = w.globals.series[seriesIndex][dataPointIndex];
            // const xAxisValue = heatmapData?.areas[dataPointIndex]; 
            const xAxisValue = JSON.parse(localStorage.getItem('userData'))?.area_ids?.name || ''; 
            const yAxisValue = chartContext.w.config.series[seriesIndex].name || '';
            const subArea = subAreas[dataPointIndex] || '';
            console.log('x value', xAxisValue)
            console.log('y value', chartContext.w.config.series[seriesIndex].name)
            console.log('sub value', subArea);
            console.log(filters)
            // Store in localStorage
            localStorage.setItem('xAxisValue', JSON.stringify(xAxisValue));
            localStorage.setItem('yAxisValue', JSON.stringify(yAxisValue));
            localStorage.setItem('subValue', JSON.stringify(subArea));
            localStorage.setItem('heatmapfilters', JSON.stringify(filters)); 
            const role = JSON.parse(localStorage.getItem('role')); 
            navigate(`${process.env.PUBLIC_URL}/dashboard/default/alerts/${role}`);
          } catch (error) {
            errorToast('Something went wrong')
          } 
         
        },
      },
      background: '#fff',
      fontFamily: 'inherit', 
      responsive: [{
        breakpoint: 800,
        options: {
          chart: {
            width: 600  
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '10px'  
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '10px' 
              }
            }
          },
          dataLabels: {
            style: {
              fontSize: '10px' 
            }
          }
        }
      }]
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 100,
        colors: ['#1e293b'],

      }
    },
    xaxis: { 
      categories:  heatmapData.camera_mapping_id?.map((id, index) => { 
        return `${id?.split('-')?.pop()}`;
      }), 
      labels: {
        style: {
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },


    yaxis: {
      // categories: ['Vest', 'Helmet'],
      categories: heatmapData?.data.map(item => item.name),
      labels: {
        style: {
          fontSize: '12px',
        }
      }
    },
    plotOptions: {
      heatmap: {
        enableShades: false,
        shadeIntensity: 0.5,
        distributed: true,
        radius: 10,
        padding: 5,
        colorScale: {
          ranges: [
            {
              from: -1,
              to: -1,
              name: ' ',
              color: '#f6f6f6',
              foreColor: '#f6f6f6'
            },
            {
              from: 0,
              to: 0,
              name: ' ',
              color: '#dde8f9',
              foreColor: 'black'
            },
            {
              from: 1,
              to: 10,
              name: 'Normal',
              color: '#dde8f9',
              foreColor: '#000000'
            },
            {
              from: 11,
              to: 20,
              name: 'Serious',
              color: '#86ADE9',
              foreColor: '#000000'
            },
            {
              from: 21,
              to: 30,
              name: 'Trouble',
              color: '#1e67d6',
              foreColor: '#ffffff',
            },
            {
              from: 31,
              to: 10000000000000,
              name: 'Critical',
              color: '#175fa4', // Color for all values >= 31
              foreColor: '#ffffff'
            }
          ]
        }
      }
    },
    grid: {
      show: false
    },
    legend: {
      show: false
    },
    tooltip: {
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const value = w.globals.series[seriesIndex][dataPointIndex];
        const cameraID = heatmapData?.camera_mapping_id?.[dataPointIndex] || "N/A";
        return `<div class="custom-tooltip">
                  <strong>Camera ID:</strong> ${cameraID}<br/>
                  <strong>Alerts:</strong> ${value}
                </div>`;
      },
    },
  }
 
  const {areas=[],subAreas=[],camera_mapping_id}=heatmapData
   const newAreass = areas?.map((ar) => {
      const [prefix, number] = ar.split('-'); // Split the string by '-'
      const formattedNumber = number < 10 ? `0${number}` : number; // Add leading zero if below 10
      return `${prefix}-${formattedNumber}`; // Combine prefix and formatted number
  });
  const [newAreas, setNewAreas] = useState(newAreass)
 

  const items = [
    { label: 'Normal', color: '#dde8f9', width: '74px', height: '5px', borderRadius: '5px' },
    { label: 'Serious', color: '#86ADE9', width: '58px', height: '5px', borderRadius: '5px' },
    { label: 'Trouble', color: '#1e67d6', width: '42px', height: '5px', borderRadius: '5px' },
    { label: 'Critical', color: '#164b9c', width: '26px', height: '5px', borderRadius: '5px' },
    { label: 'N/A', color: '#f6f6f6', width: '18px', height: '5px', borderRadius: '5px', padding: true },
  ];

  useEffect(() => {
      
      setseries(heatmapData?.data); 
   
  }, [heatmapData])

 
  return (
    <Card style={{minHeight:'300px',borderRadius:'32px'}}>

      <CardHeader className='pb-0' style={{ border: '0px',borderTopLeftRadius:'32px',borderTopRightRadius:'32px' }}>
        <h5 >Area Intensity Heatmap</h5>
      </CardHeader>
      {loader ? <div className='w-100 h-100 d-flex justify-content-center align-items-center position-absolute ' style={{height:'100%'}}><Loader3  /></div> :
        <CardBody className='pt-0'>
          <Row >
            <Col >
              <div className='colorShadeOfheatMap' style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '205px' }}>

                {items.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TbPoint style={{ color: item.color, fontSize: '25px' }} />
                    <span style={{ fontSize: '14px', color: '#6c757d' }}>{item.label}</span>
                    <div style={{
                      width: item.width,
                      height: item.height,
                      borderRadius: item.borderRadius,
                      backgroundColor: item.color,
                      marginLeft: item.padding == true && '23px'
                    }}
                      className='barcolorwidth'
                    > 
                    </div> 
                  </div>
                ))}
              </div>
            </Col>
            <Col xs='12' className='heatmapnewdesign' style={{ overflowX: 'auto' }}>
              <div style={{ minWidth: '600px' }}>
                <ReactApexChart
                  options={ AreaDashboard?options2:options}
                  series={series}
                  type="heatmap"
                  height="350px"
                />
                <p className='text-center'>Alerts</p>
              </div>
            </Col>

          </Row>
         
        </CardBody>
      }

    </Card>
  )
}