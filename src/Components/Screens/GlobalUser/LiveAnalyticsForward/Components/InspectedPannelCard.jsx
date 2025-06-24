import React,{useState,useRef,useEffect}from 'react'
import { Card, CardBody } from 'reactstrap';
import { Loader3 } from '../../../../../CommonElements/Spinner/loader';
import Icon from '../asset/user.svg';
import PannelData from '../Zustand/DataSender';
const InspectedCard = () => {
  const inspectedPanels=PannelData((state)=>state.inspectedPanels)
  const connectWebSocket=PannelData((state)=>state.connectSocket)

  console.log("inspected Panels data", inspectedPanels)

  useEffect(()=>{
    connectWebSocket();
  },[connectWebSocket]);
  return (
    <Card style={{ borderRadius: '24px', minHeight: '135px', maxHeight: 'auto', backgroundColor: "#141E2B",border:"1px solid rgb(37, 37, 37)" }} >
      <CardBody >
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <p className='ellipsis-text' style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: '500' }}>Inspected Panels</p>
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
          {inspectedPanels}
          </p>
      </CardBody>
    </Card>
  )
}

export default InspectedCard;
