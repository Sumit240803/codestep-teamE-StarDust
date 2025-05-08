import React from "react";
import "./index.css"
interface GameProps {
  id : bigint;
    title: string;
    gimage: string;
    description: string;
    gameType : string;
    onClick?: () => void;
}
export interface GameType {
    id : bigint;
    title: string;
    gimage: string;
    description: string;
    gameType : string;
    onClick?: () => void;
  }
  
interface GameProps extends GameType{}
const Game : React.FC<GameProps>=({
  id,
    title,
    gimage,
    description,
   gameType,
   onClick
})=>{
    return (
        <div className="mine-card-wrapper" onClick={onClick}>
              <div className="mine-card card-css">
                <div>
                  <div className="mine-card-image-container">
                    <img
                      src={gimage}
                      alt="Card-imgs"
                      className="mine-card-image"
                    />
                  </div>
                </div>
                <div className="mine-card-content">
                  <div className="mine-card-header">
                    <h3 className="mine-card-title">{title}</h3>
                    <p className="mine-card-subtitle">{description}</p>
                  </div>
                  
                  <div className="mine-card-stats">
                    <div className="mine-card-stat-row">
                      <span className="mine-card-stat-label">Game Type</span>
                      <span className="mine-card-stat-value">
                        {gameType}
                      </span>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>
    )
}
export default Game