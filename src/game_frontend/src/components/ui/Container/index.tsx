import React, { ReactNode } from 'react';
import './index.css';


const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='thank-you-container'>
      <div className='thank-you-wrapper'>
        {children}
      </div>
    </div>
  );
};


export default Container;