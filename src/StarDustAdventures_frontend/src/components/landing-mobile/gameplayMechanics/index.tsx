import { useEffect, useRef } from "react";
import { CARDS } from "../../landing/gamePlayMechanics";
import Card from "./Card";
import './index.css';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Renders the header for gameplay mechanics.
 * @param {Object} props - Component props
 * @param {React.RefObject<HTMLDivElement>} props.headerRef - Ref for the header container
 */
const Header = ({ headerRef }: { headerRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <div className='mob-gameplay-header' ref={headerRef}>
      <h3 className='section-title'>Gameplay Mechanics</h3>
      <p className='section-caption'>Explore the engaging system of Star Dust Adventures</p>
    </div>
  );
};

/**
 * Renders a list of gameplay mechanic cards.
 * @param {Object} props - Component props
 * @param {React.RefObject<HTMLDivElement>} props.cardsRef - Ref for the cards container
 */
const CardList = ({ cardsRef }: { cardsRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <div className="gameplay-mechanics-cards-list" ref={cardsRef}>
      {CARDS.map((card, index) => (
        <Card {...card} key={index} />
      ))}
    </div>
  );
};

/**
 * Renders the Gameplay Mechanics section with GSAP animations and ScrollTrigger.
 */
const GameplayMechanics = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current && containerRef.current && cardsRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Header animation
      tl.fromTo(headerRef.current, { x: '100%', height: '100vh' }, { x: 0, height: 0, duration: 1 });

      // Cards animation
      const cards = cardsRef.current.querySelectorAll(".mob-gameplay-card");
      tl.fromTo(cards, 
        { opacity: 0.8, scale: 0.8 }, 
        { xPercent: -100 * (cards.length - 1), ease: "none", opacity: 1, scale: 1 }
      );

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <section className='mob-gameplay-container' ref={containerRef}>
      <Header headerRef={headerRef} />
      <CardList cardsRef={cardsRef} />
    </section>
  );
};

export default GameplayMechanics;
