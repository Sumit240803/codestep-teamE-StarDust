import React from 'react'
import './lore.css'
import { loreText } from '../../../constants/text'

const Lore = () => {
  return (
    <div className='lore-sec'>
        <h1 className="ls-title">
            {loreText.title}
        </h1>
        <p className="ls-text">
            {loreText.subHeading}
        </p>

        <div className="ls-main">
        <img 
            src='rotation.gif' 
            alt='astronaut adventure' 
            className="ls-rotating-astro"
        />
            <div className="lsm-first">
                <div className="lsm-text-item">
                    <h3 className="lsm-ti-title">{loreText.data[0].title}</h3>
                    <div className="lsm-ti-text">{loreText.data[0].text}</div>
                </div>
            </div>
            <div className="lsm-second">
                <div className="lsm-text-item">
                    <h3 className="lsm-ti-title">{loreText.data[1].title}</h3>
                    <div className="lsm-ti-text">{loreText.data[1].text}</div>
                </div>
                <div className="lsm-text-item">
                    <h3 className="lsm-ti-title">{loreText.data[2].title}</h3>
                    <div className="lsm-ti-text">{loreText.data[2].text}</div>
                </div>  
            </div>
            <div className="lsm-third">
                <div className="lsm-text-item">
                    <h3 className="lsm-ti-title">{loreText.data[3].title}</h3>
                    <div className="lsm-ti-text">{loreText.data[3].text}</div>
                </div>
                <div className="lsm-text-item">
                    <h3 className="lsm-ti-title">{loreText.data[4].title}</h3>
                    <div className="lsm-ti-text">{loreText.data[4].text}</div>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default Lore