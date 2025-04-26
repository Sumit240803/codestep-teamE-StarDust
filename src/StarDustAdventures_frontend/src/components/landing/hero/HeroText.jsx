import React from 'react';
import './hero.css';

const HeroText = () => {
  return (
    window.innerWidth > 1024 ? (
      <div className="hs-text-cont2">
        <h3 className="hstc2-title">Overview of Star Dust Adventures</h3>
        <p className="hstc2-text">A Tap-to-Earn Game Combining Exploration and Blockchain</p>
      </div>
    ) : (
      <></>
    )
  );
};

export default HeroText;
