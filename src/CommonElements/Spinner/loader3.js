
import React from "react";
import { ScaleLoader  } from 'react-spinners';

const MyComponent = () => { 
  return (
    <div  className="d-flex justify-content-center align-items-center">
       <ScaleLoader  size={20} color="#1E67D6" />
    </div>
  );
}

export default MyComponent;