import React from 'react'
import { Card, CardBody } from 'reactstrap';
import { BiCctv } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
import  Loader3  from '../../../../../../CommonElements/Spinner/loader3';
import '../style/style.css'
const NewCameraCount=({loader,data})=> { 
  return (
    <Card style={{borderRadius:'24px',minHeight:'170px',maxHeight:'auto'}} >
      {loader?<span className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute"><Loader3 /></span>:
        <CardBody className='p-4'>
            <p className='ellipsis-text' style={{fontSize:'16px',color:'#383838',fontWeight:'400'}}>Live Camera Count</p>
            <div className='d-flex align-items-center gap-2'>
                <BiCctv style={{minWidth:'40px',height:'40px',borderRadius:'20px',padding:'5px',background:'#175FA4',color:'white'}} className='border'/>
                <p className='m-0' style={{color:'#595959',fontSize:'16px'}} ><span style={{fontSize:'30px',fontWeight:'500',}}>
                {Number.isInteger(data?.active_cameras) ? data?.active_cameras: "N/A"}
                   </span>/ 
                  {Number.isInteger(data?.total_cameras) ? data?.total_cameras : "N/A"}
                  </p> 
            </div>
        </CardBody>
    }
    </Card>
  )
}

export default NewCameraCount;
