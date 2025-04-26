import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import BgOverlay from '../../ui/BgOverlay'
import { AnimatePresence, motion } from 'framer-motion'
import ConnectWallet from './connectWallet'
import './index.css'

const Hero = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    /**
     * To Open the Modal
     */
    const openModal = () => {
        setIsModalOpen(true);
    }

    /**
     * To Close the Modal
     */
    const closeModal = () => {
        setIsModalOpen(false);
    }

  return (
    <div className='hero-sec' style={{backgroundImage:'url("hero_bg.webp")',backgroundSize:'cover'}}>
        {/* To Optimize Background Image Load */}
        <img src="hero_bg.webp" alt="hero" style={{display:'none'}} fetchPriority='high'/>
        <BgOverlay/>
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:3,duration:2,type:'tween'}}
            className="hs-text-cont"
        >
            <h1 className="hstc-title">
                Star Dust Adventures
            </h1>
            <p className='hstc-text'>
                A Space Exploration Tap-to-Earn Game Powered By Crypto
            </p>
            <Button className='play-button' onClick={openModal}>CONNECT WALLET</Button>
        </motion.div>
            <AnimatePresence mode='wait'>
                {
                    isModalOpen && <ConnectWallet closeModal={closeModal}/>
                }
        </AnimatePresence>
        <motion.img
            initial={{bottom:1000}}
            animate={{bottom:-100}}
            transition={{duration:3,type:'tween'}}
            src="/assets/images/astronaut.webp" 
            alt="falling astronaut" 
            className="hs-falling-astro" 
            fetchPriority='high'
            width="300"
        />
    </div>
  )
}

export default Hero