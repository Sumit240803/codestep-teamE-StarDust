import React, { useEffect } from 'react'
import Button from '../../re-usables/Button'
import './hero.css'
import BgOverlay from '../../re-usables/BgOverlay'
import { motion } from 'framer-motion'
import HeroContext from './heroContext'
import HeroText from './HeroText'
const Hero = () => {
  return (
    <div className='hero-sec' style={{backgroundImage:'url("hero_bg.webp")',backgroundSize:'cover'}}>
        {/* To Optimize Background Image Load */}
        <img src="hero_bg.webp" alt="hero" style={{display:'none'}} fetchpriority='high'/>
        <BgOverlay/>
        <HeroContext/>
        <motion.img
            initial={{y:-1000}}
            animate={{y:0}}
            transition={{duration:3,type:'tween'}}
            src="/assets/images/astronaut.webp" 
            alt="falling astronaut" 
            className="hs-falling-astro" 
            fetchpriority='high'
        />
              <HeroText />


    </div>
  )
}

export default Hero