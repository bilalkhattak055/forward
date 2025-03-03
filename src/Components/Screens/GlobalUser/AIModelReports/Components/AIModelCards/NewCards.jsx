import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { H5, H6 } from '../../../../../../AbstractElements'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
import './newcard.css'


function NewCards({data, ref}) {
    const navigate = useNavigate();
    console.log('new cards api receive',data)
  return (
    <>
    <Card>
        <CardBody>
    <Row>
    {
        Object.values(data).map((mod,key) => {
            return(
                <>
                
                    <Col ref={ref} xxl={4} xl={6} lg={12}>
                    <Card style={{backgroundColor:`${key==0 ? '#E9F6FC' : key==1 ? '#FEEAF0' : key==2 ? '#F6E9FE' : key==3 ? '#EEF8ED' : '#FFF7E6'}`, borderColor:`${key==0 ? '#BCE3F4' : key==1 ? '#FDBFCF' : key==2 ? '#E4BCFD' : key==3 ? '#EEF8ED' : '#FFE5B2'}`, borderRadius:'10px', border:`1px solid ${key==0 ? '#BCE3F4' : key==1 ? '#FDBFCF' : key==2 ? '#E4BCFD' : key==3 ? '#EEF8ED' : '#FFE5B2'}`}}>
                        <CardBody>
                        <div className='d-flex justify-content-between align-items-center mt-1'>
                        <p className='m-0 p-0' style={{fontSize:'24px', fontWeight:'500'}}>{Object.keys(data)[key]=='machine_guard_open' ? 'Machine Guard' : Object.keys(data)[key]=='emergency_exit_blockage' ? 'Emergency Exit' : Object.keys(data)[key]=='forklift_person_in_same_aisle' ? 'MMHE' : Object.keys(data)[key]}</p>
                   <div
  style={{
    position: "relative",
    width: "60px", // Slightly larger size to match the visual
    height: "60px",
    borderRadius: "50%",
    background: `conic-gradient(#54BA4A 0% ${mod.total_compliance_percentage}%, #d3d3d3 ${mod.total_compliance_percentage}% 100%)`, // Match the green and gray
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <div
    style={{
      position: "absolute",
      width: "50px", // Inner circle to create the donut effect
      height: "50px",
      borderRadius: "50%",
      backgroundColor:`${key==0 ? '#E9F6FC' : key==1 ? '#FEEAF0' : key==2 ? '#F6E9FE' : key==3 ? '#EEF8ED' : '#FFF7E6'}`, // Matches the inner background
    }}
  ></div>
  <span
    style={{
      position: "absolute",
      fontSize: "16px", // Larger text to match
      fontWeight: "500",
      color: "#333", // Darker text color
    }}
  >
    {mod.total_compliance_percentage}%
  </span>
</div>

                        </div>
                        <div className=' d-flex justify-content-between align-items-end flex-wrap mt-3 '>
                        <div className='d-flex align-items-center justify-content-between'>
                                <p style={{fontSize:'16px', fontWeight:'400'}} className='p-0 m-0' >{mod.total_cameras}</p>
                                <p className='p-0 ms-1 me-0 my-0' style={{color:'#696969', fontSize:'14px', fontWeight:'400'}}>Cameras</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p style={{fontSize:'16px', fontWeight:'400'}} className='p-0 m-0' >{mod.total_frames}</p>
                                <p className='p-0 ms-1 me-0 my-0' style={{color:'#696969', fontSize:'14px', fontWeight:'400'}}>Frame</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p style={{fontSize:'16px', fontWeight:'400'}} className='p-0 m-0' >{mod.total_event}</p>
                                <p className='p-0 ms-1 me-0 my-0' style={{color:'#696969', fontSize:'14px', fontWeight:'400'}}>Event</p>
                            </div>
                            </div>
                        <hr className='mx-0 mt-1 mb-3 p-0' />
                        <div className='d-flex flex-wrap justify-content-between'>
                           
                         
                            <div>
                                <p className='p-0 m-0' style={{color:'#696969', fontSize:'14px', fontWeight:'400'}}>Compliance</p>
                                <p className='p-0 m-0' style={{fontSize:'20px', fontWeight:'400'}} >{mod.total_compliance}</p>
                            </div>
                            <div>
                                <p className='p-0 m-0' style={{color:'#696969', fontSize:'14px', fontWeight:'400'}}>Non-Compliance</p>
                                <p className='p-0 m-0' style={{fontSize:'20px', fontWeight:'400'}} >{mod.total_alerts}</p>
                            </div>
                            <div className='d-flex seemore align-items-end'>
                                <button onClick={()=>navigate(`${process.env.PUBLIC_URL}/moduleInfo/${JSON.parse(localStorage.getItem('role'))}`,{state:{module:Object.keys(data)[key], cameras:mod.camera_data}})} className='btn btn-primary seemore p-xl-2 p-lg-2 p-md-2 p-sm-2'
  
  style={{ cursor:'pointer'}} >See More</button>
                            </div>
                            
                        </div>
                        </CardBody>
                    </Card>
                    </Col>
                
                </>
            )
        })
    }
    </Row>
    </CardBody>
    </Card>
    </>
  )
}

export default NewCards