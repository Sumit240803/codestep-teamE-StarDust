import React from "react";
import "./index.css"
interface GameProps {
    title : string;
    image : string;
    description : string;
    winBonus : number;
    energy : number;
}
export interface GameType {
    title: string;
    image: string;
    description: string;
    winBonus: number;
    energy: number;
  }
  
interface GameProps extends GameType{}
const Game : React.FC<GameProps>=({
    title,
    image,
    description,
    winBonus,
    energy
})=>{
    return (
        <div className="mine-card-wrapper" /*onClick={onClick}*/>
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
                    <h3 className="mine-card-title">{title}</h3>
                    <p className="mine-card-subtitle">{description}</p>
                  </div>
                  
                  <div className="mine-card-stats">
                    <div className="mine-card-stat-row">
                      <span className="mine-card-stat-label">Win Bonus</span>
                      <span className="mine-card-stat-value">
                        <span className="mine-card-icon">🏆</span>
                        +{winBonus.toString()}
                      </span>
                    </div>
                    
                    <div className="mine-card-stat-row">
                      <span className="mine-card-stat-label">Energy</span>
                      <span className="mine-card-stat-value">
                        <span className="mine-card-icon">⚡</span>
                        +{energy.toString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
}
export default Game