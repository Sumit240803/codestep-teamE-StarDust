import React, { lazy, Suspense, useEffect, useState } from 'react';
import '../components/landing/landing.css';
import Hero from '../components/landing/hero/Hero';
import Footer from '../components/landing/footer';
import GameConcept from '../components/landing/gameConcept/GameConcept';
import Lore from '../components/landing/loreStoryline/Lore';
import GradientCover from '../components/landing/GradientCover';
import GameConceptM from '../components/landing-mobile/gameConcept/GameConceptM';
import LoreM from '../components/landing-mobile/lore/index';
import StarDustMobile from '../components/landing-mobile/star-mobile-landing/StarDustMobile';
import GamePlayMechanics from '../components/landing/gamePlayMechanics';
import MobileGameplayView from '../components/landing-mobile/gameplayMechanics';

const PatternCover = () => {
  // Add debouncing to prevent rapid state updates
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= 768);
  
  useEffect(() => {
    let timeoutId = null;
    
    const handleResize = () => {
      // Clear previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set new timeout
      timeoutId = setTimeout(() => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
        setIsMobile(newWidth <= 768);
      }, 150); // 150ms delay
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <GradientCover>
      <Suspense >
        <div key={isMobile ? 'mobile' : 'desktop'}>
          {isMobile ? <MobileGameplayView /> : <GamePlayMechanics />}
          {isMobile ? <LoreM /> : <Lore />}
        </div>
      </Suspense>
    </GradientCover>
  );
};

const Landing = () => {
  // Add debouncing here as well
  const [width, setWidth] = useState(window.innerWidth);
  const [isDesktop, setIsDesktop] = useState(width > 1024);
  
  useEffect(() => {
    let timeoutId = null;
    
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
        setIsDesktop(newWidth > 1024);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="page">
      <Hero />
      <div key={isDesktop ? 'desktop' : 'mobile'}>
        {isDesktop ? <GameConcept /> : <StarDustMobile />}
      </div>
      <PatternCover />
      <Footer />
    </div>
  );
};

export default Landing;