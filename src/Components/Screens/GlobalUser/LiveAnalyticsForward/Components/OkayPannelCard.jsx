import React,{useState,useEffect,useRef} from 'react'
import { Card, CardBody } from 'reactstrap';
import { Loader3 } from '../../../../../CommonElements/Spinner/loader';
import Icon from '../asset/user.svg'
const OkayCard = () => {
  const[pannelData,setPannelData]=useState({okayPanels:0})
  const wsRef=useRef(null);

  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8765');
    wsRef.current = socket;

    socket.addEventListener('open', (event) => {
      console.log('Connected to WebSocket server');
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket data received:', data);
      setPannelData({okayPanels:data.okayPanels})
  });
  }, [])


  return (
    <Card style={{ borderRadius: '24px', minHeight: '140px', maxHeight: 'auto', backgroundColor: "#FFFFFF",border:"3px solid rgba(255, 255, 255, 1)" }} >
      <CardBody className='p-3'>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <p className='ellipsis-text' style={{ fontSize: '12px', color: '#52526CCC', fontWeight: '500' }}> Okay Panels</p>
        <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "linear-gradient(45deg, rgba(1, 161, 78, 0.2), rgba(0, 160, 74, 0))",
      }}
    >
    <img src={Icon} alt='user'/>
    </div>
        
        </div>
          <p style={{ color: '#2F2F3B', fontSize: '28px', marginTop: "-20px",fontWeight: '500' }} >
            {pannelData.okayPanels}
          </p>
      </CardBody>
    </Card>
  )
}

export default OkayCard;
