import React from 'react'
import './gameConcept.css'
import { gameConceptText } from '../../../constants/text'

const GameConceptM = () => {
  return (
    <div className='m-game-concept-main' style={{backgroundImage:'url("mbg.png")',backgroundSize:'cover'}}>
        <div className="mgc-header">
            <h1 className="mgc-title">
                Overview of Star Dust Adventures
            </h1>
            <p className="mgc-subtext">
                A Tap-to-Earn Game Combining Exploration and Blockchain
            </p>
        </div>
        <div className="mgc-content">
            <img src="red_planet.png" alt="red planet" className="mgc-img" />
            <div className="mgc-info-cont">
                {
                    gameConceptText.left.map((item,index)=>(
                        <div className={index==1?"mgci-item2":"mgci-item"} key={index}>
                            <h3 className="mgci-title">{item.title}</h3>
                            <p className="mgci-text">{item.text}</p>
                        </div>
                    ))
                }
                <div className="mgci-item3">
                    <h3 className="mgci-title">{gameConceptText.center.title}</h3>
                    <p className="mgci-text">{gameConceptText.center.text}</p>
                </div>
                {
                    gameConceptText.right.map((item,index)=>(
                        <div className={index==0?"mgci-item2":"mgci-item"} key={index}>
                            <h3 className="mgci-title">{item.title}</h3>
                            <p className="mgci-text">{item.text}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        
    </div>
  )
}

export default GameConceptM