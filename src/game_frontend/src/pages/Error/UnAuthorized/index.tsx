import React from 'react';
import './index.css';
import Button from '../../../components/ui/Button';

const UnAuthorized: React.FC = () => {
    return (
        <div 
            className="unauthorized-container" 
            style={{ backgroundImage: "url('/hero_bg.webp')" }}
        >
            <div className="unauthorized-card">
                <h1 className="unauthorized-heading">Unauthorized</h1>
                <p className="unauthorized-text">
                    You do not have permission to access this page.
                </p>
                <Button onClick={() => (window.location.href = '/')} >
                Go to Homepage
                </Button>
            </div>
        </div>
    );
};

export default UnAuthorized;