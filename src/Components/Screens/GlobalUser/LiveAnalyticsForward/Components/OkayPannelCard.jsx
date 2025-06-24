import React,{useState,useEffect,useRef} from 'react'
import { Card, CardBody } from 'reactstrap';
import Icon from '../asset/user.svg'
import PannelData from '../Zustand/DataSender';
const OkayCard = () => {
  const OkayPannels=PannelData((state)=>state.okayPanels);
  const ConnectSocket=PannelData((state)=>state.connectSocket);
  useEffect(()=>{
    ConnectSocket();
  },[ConnectSocket])
  return (
    <Card style={{ borderRadius: '24px', minHeight: '140px', maxHeight: 'auto', backgroundColor: "#141E2B",border:"1px solid rgb(37, 37, 37)" }} >
      <CardBody className='p-3'>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <p className='ellipsis-text' style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: '500' }}> Okay Panels</p>
        <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "linear-gradient(45deg, rgba(203, 238, 220, 0.2), rgba(237, 243, 240, 0))",
      }}
    >
    <img src={Icon} alt='user'/>
    </div>
        
        </div>
          <p style={{ color: '#FFFFFF', fontSize: '28px', marginTop: "-20px",fontWeight: '500' }} >
            {OkayPannels}
          </p>
      </CardBody>
    </Card>
  )
}

export default OkayCard;
