import React from 'react'
import { Card, CardBody } from 'reactstrap';
import { Loader3 } from '../../../../../CommonElements/Spinner/loader';
const UserCard = () => {
  return (
    <Card style={{ borderRadius: '24px', minHeight: '300px', maxHeight: 'auto', backgroundColor: "#84CDA7",border:"3px solid rgba(255, 255, 255, 1)" }} >
      <CardBody className='pt-3'>
        <p className='ellipsis-text' style={{ fontSize: '20px', color: '#335436', fontWeight: '500' }}>Welcome Hamza!</p>
        <div className='d-flex align-items-center '>
          <p style={{ color: '#335436', fontSize: '13px', marginTop: "-5px",textWrap:"wrap" }} >
            Lorem Ipsum is simply text of the printing and typesetting
          </p>
        </div>
        <button className="btn text-white px-4 py-3 shadow-sm mt-5" style={{ backgroundColor: "#84CDA7", color:"#FFFFFF",fontSize: "15px",border:"1px solid #FFFFFF"  }}>
            View Profile
        </button>
      </CardBody>
    </Card>
  )
}

export default UserCard;
