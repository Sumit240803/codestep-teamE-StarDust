import React, { ReactNode } from 'react';
import './index.css';



const TagContainer: React.FC<TagProps> = ({ children }) => {
  return (
    <div className='friends-container'>
      <div className='friends-wrapper'>
        {children}
      </div>
    </div>
  );
};

export default TagContainer;