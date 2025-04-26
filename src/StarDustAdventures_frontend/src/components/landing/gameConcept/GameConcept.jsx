import React from 'react'
import './gameConcept.css'
import { gameConceptText } from '../../../constants/text'

const GameConcept = () => {
    return (
        <div className='game-concept-sec'>
            <div className="gcs-sub-left">
                {
                    gameConceptText.left.map((item, index) => (
                        <div
                            className="gcs-sl-item fade-left"
                            data-aos="fade-left"
                            key={index}
                            data-aos-delay={index == 0 ? 500 : 1500}
                            data-aos-duration={1500}
                        >
                            <h4 className="gcs-sl-title">
                                {item?.title}
                            </h4>
                            <p className="gcs-sl-text">
                                {item?.text}
                            </p>
                        </div>
                    ))
                }

            </div>
            <div className="gcs-sub-center">
                <img src="red_planet.png" alt="red planet" className="gcs-sc-img" />
                <div className="gcs-sc-text-item" data-aos="fade-up" data-aos-duration={1500}>
                    <h4 className="gcs-sc-title">{gameConceptText.center.title}</h4>
                    <p className="gcs-sc-text">{gameConceptText.center.text}</p>
                </div>
            </div>

            <div className="gcs-sub-right">
                {
                    gameConceptText.right.map((item, index) => (
                        <div
                            key={index}
                            className="gcs-sr-item"
                            data-aos="fade-right"
                            data-aos-delay={index == 0 ? 1000 : 2000}
                            data-aos-duration={1500}
                        >
                            <h4 className="gcs-sr-title">
                                {item?.title}
                            </h4>
                            <p className="gcs-sr-text">
                                {item?.text}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GameConcept