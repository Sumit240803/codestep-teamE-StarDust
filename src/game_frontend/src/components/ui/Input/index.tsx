import React, { ReactNode } from 'react';
import './index.css'

interface ValueProps {
    children: ReactNode;
} 

const Input: React.FC<ValueProps>  =  ({ children }) => {
    return (
        <div className='main-value '>
            <div className='two-step-border '>

            {children}
            
        </div>
        </div>
    );
}

export default Input;
