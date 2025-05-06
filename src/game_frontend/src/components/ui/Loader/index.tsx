import React, { useState } from 'react';
import './index.css'
import { Navigate } from 'react-router-dom';

const Loader: React.FC = () => {
  const [navigate , setNavigate] = useState<boolean>(false);
  const handleLogin =()=>{
    setNavigate(true);
  }
  if(navigate){
    return <Navigate to= "/" replace/>
  }else{
    return (
      <>
    <div className="loader  fixed top-1/2  -translate-y-1/2"></div>
    <button className='text-black font-bold text-underline py-10' onClick={handleLogin}>Click here to login Again if taking too much time </button>
    </>
  );
}
};

export default Loader;
