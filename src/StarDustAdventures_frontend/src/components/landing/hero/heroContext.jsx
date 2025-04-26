import React, { useEffect } from 'react'
import Button from '../../re-usables/Button'
import './hero.css'
import { motion } from 'framer-motion'

const HeroContext = () => {
    return (
        <div>
              <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:3,duration:2,type:'tween'}}
            className="hs-text-cont"
        >
            <h1 className="hstc-title1">
                Star Dust 
            </h1>
            <h1 className="hstc-title">
            Adventures
            </h1>
            <p className='hstc-text'>
                A Space Exploration Tap-to-Earn Game Powered By Crypto
            </p>
            <Button className='play-button'>PLAY</Button>
        </motion.div>
      
        </div>
    )
}

export default HeroContext;  