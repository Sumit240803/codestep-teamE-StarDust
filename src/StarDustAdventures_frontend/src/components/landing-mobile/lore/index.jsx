import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const LoreM = () => {
  // References for each section
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const rotationImageRef = useRef(null);
  const settingRef = useRef(null);
  const starDustRef = useRef(null);
  const commanderRef = useRef(null);
  const challengesRef = useRef(null);
  const uncoveringRef = useRef(null);

  useEffect(() => {
    // Prevent default scroll behavior and hide scrollbar
    document.body.style.overflowX = 'hidden';
    
    // Create GSAP timeline with adjusted settings
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#lore-container-second",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Animation Sequence
    tl.fromTo(headerRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(rotationImageRef.current, 
      { y: 200, opacity: 0 }, 
      { y: 100, opacity: 1, duration: 1 }
    )
    .to(rotationImageRef.current, 
      { opacity: 0.3, scale: 0.9, duration: 1 }
    )
    .fromTo(settingRef.current, 
      { y: 200, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }
    )
    .to(settingRef.current, 
      { y: -20, opacity: 1, duration: 1 }
    )
    .fromTo(starDustRef.current, 
      { y: 150, opacity: 0 }, 
      { y: -50, opacity: 1, duration: 1 }
    )
    .to(settingRef.current, 
      { y: -30, opacity: 0, duration: 1 }
    )
    .to(starDustRef.current, 
      { y: -100, opacity: 1, duration: 1 }
    )
    .to(starDustRef.current, 
      { y: -200, opacity: 1, duration: 1 }
    )
    .fromTo(commanderRef.current, 
      { y: 600, opacity: 0 }, 
      { y:-200, opacity: 1, duration: 1 }
    )
    .to(starDustRef.current, 
      { y: -200, opacity: 0, duration: 1 }
    )
    .to(commanderRef.current, 
      { y: -420, opacity: 1, duration: 1 }
    )
    .fromTo(challengesRef.current, 
      { y: 600, opacity: 0 }, 
      { y: -420, opacity: 1, duration: 1 }
    )
    .to(commanderRef.current, 
      { y: -430, opacity: 0, duration: 1 }
    )
    .to(challengesRef.current, 
      { y: -600, opacity: 1, duration: 1 }
    )
    .fromTo(uncoveringRef.current,
      { y: 700, opacity: 0 }, 
      { y: -620, opacity: 1, duration: 1 }
    )
    .to(challengesRef.current, 
      { y: -610, opacity: 0, duration: 1 }
    )
    .to(uncoveringRef.current, 
      { y: -800, opacity: 1, duration: 1 }
    )
    .to(uncoveringRef.current, 
      { y: -810, opacity: 0, duration: 1 }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.body.style.overflowY = '';
    };
  }, []);

  return (
    <div 
      id="lore-container-second" 
      ref={containerRef}
      className="lore-container"
      style={{ backgroundImage: 'url("mbg.png")', backgroundSize: 'cover' }}
    >
      <main className="lore-main">
        <header ref={headerRef} className="lore-header">
          <div className="header-content">
            <h2 className="header-title font-coin">
              Lore and <br /> Storyline
            </h2>
            <p className="header-description">
              Explore the Epic Quest for Star Dust in a Distant Future
            </p>
          </div>
        </header>

        <div ref={rotationImageRef} className="rotating-image-container">
          <img
            src='rotation.gif'
            width={557}
            height={557}
            loading='lazy'
            alt="Rotating illustration"
            className="rotating-image"
          />
        </div>

        <section ref={settingRef} className="setting-section">
          <h2 className="setting-title">
            Setting in the <br /> Distant Future
          </h2>
          <p className="setting-description">
            Humanity embarks on a quest to gather cosmic resources in a vast universe.
          </p>
        </section>

        <section ref={starDustRef} className="stardust-section">
          <div className="stardust-content">
            <h2 className="stardust-title">
              Star Dust <br /> as Currency
            </h2>
            <p className="stardust-description">
              Star Dust emerges as a vital energy source, becoming the universal currency.
            </p>
          </div>
        </section>

        <section ref={commanderRef} className="commander-section">
          <h2 className="commander-title">
            Commander <br /> Dom's Mission
          </h2>
          <p className="commander-description">
            Elite astronaut Commander Dom leads a mission to mine Star Dust and upgrade gear.
          </p>
        </section>

        <section ref={challengesRef} className="challenges-section">
          <div className="challenges-content">
            <h2 className="challenges-title">
              Challenges <br /> Ahead
            </h2>
            <p className="challenges-description">
              The mission involves navigating hostile planets & overcoming various obstacles.
            </p>
          </div>
        </section>

        <section ref={uncoveringRef} className="uncovering-section">
          <h2 className="uncovering-title">
            Uncovering <br /> Ancient Secrets
          </h2>
          <p className="uncovering-description">
            Elite astronaut Commander Dom leads a mission to mine Star Dust and upgrade gear.
          </p>
        </section>
      </main>
    </div>
  );
};

export default LoreM;