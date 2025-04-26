import React, { useState } from 'react';
import './index.css';
import usePoints from '../../../hooks/usePoints';

/**
 * Progress Bar
 * Maximum Value of Progress Bar is 1
 * We call the usePoints hook to get the points accumulated by the user
 * We divide the points by 10 to get the progress value
 * @returns A Progress Bar Component
 */

const ProgressBar: React.FC<ProgressBarProps> = () => {
    const {points} = usePoints()
    /**
     * Max Value of Bar is 1
     * So, we divide the Points accumulated by 10
     */
    const progress = points!==0 ? (points / 10) : 0;

    return (
        <div className="progress-wrapper">
            <div className="progress-bar ufo-progress-bar">
                <div 
                    className="progress-fill"
                    style={{
                        height: `${progress * 100}%`,
                        backgroundColor: '#EAB308'
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;