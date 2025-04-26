import React from 'react';
import './index.css';
import { bigIntToNumber } from '../../../utils';

interface CardProps {
  name: string;
  subtitle: string;
  points: bigint;
  time: bigint;
  level?: bigint;
  cost: bigint;
  image: string;
  onClick?: () => void; // Add onClick prop
}

const Card: React.FC<CardProps> = ({
  name,
  subtitle,
  points,
  time,
  level = BigInt(0),  //default 0 level
  cost,
  image,
  onClick
}) => {
  return (
    <div className="mine-card-wrapper" onClick={onClick}>
      <div className="mine-card card-css">
        <div>
          <div className="mine-card-image-container">
            <img
              src={image}
              alt="Card-imgs"
              className="mine-card-image"
            />
          </div>
        </div>
        <div className="mine-card-content">
          <div className="mine-card-header">
            <h3 className="mine-card-title">{name}</h3>
            <p className="mine-card-subtitle">{subtitle}</p>
          </div>
          
          <div className="mine-card-stats">
            <div className="mine-card-stat-row">
              <span className="mine-card-stat-label">Profit /hr</span>
              <span className="mine-card-stat-value">
                <span className="mine-card-icon">⌛</span>
                +{points.toString()}
              </span>
            </div>
            
            <div className="mine-card-stat-row">
              <span className="mine-card-stat-label">Click /hr</span>
              <span className="mine-card-stat-value">
                <span className="mine-card-icon">⚡</span>
                +{time.toString()}
              </span>
            </div>
          </div>

          <div className="mine-card-divider-container">
            <div className="mine-card-divider"></div>
          </div>
          
          <div className="mine-card-footer">
            <span className="mine-card-level">Lvl. {bigIntToNumber(level)}</span>
            <div className="mine-card-vertical-divider"></div>
            <span className="mine-card-cost">
              <img 
                src="/assets/ufo.svg" 
                alt="ufo-icon" 
                className="mine-card-icon" 
              />
              {(bigIntToNumber(cost)*0.001).toString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;