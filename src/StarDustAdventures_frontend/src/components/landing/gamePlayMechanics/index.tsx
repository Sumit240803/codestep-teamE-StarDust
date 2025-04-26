import { useRef, useEffect} from 'react';
import GameplayMechanic, { CardProps } from './Cards';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

// Card Static Data
export const CARDS: CardProps[] = [
  {
    title: "Core Gameplay Loop",
    description: 'Players tap to mine StarDust, with oxygen consumption renewed every 8 hours.',
    image: '/assets/images/mars.svg',
  },
  {
    title: "Progression Opportunities",
    description: "Upgrade astronaut's oxygen tank, mining tool, & storage to unlock richer resources.",
    image: '/assets/images/moon.svg',
  },
  {
    title: "Play-to-Earn System",
    description: "Accumulate StarDust, converting it to a future token tradable on exchanges for financial rewards.",
    image: '/assets/images/earth.svg',
  },
];

/**
 * Renders the header section for the gameplay mechanics.
 * @returns {JSX.Element} The header with a title and caption.
 */
const Header = (): JSX.Element => {
  return (
    <div className="gameplay-mechanics-header">
      <h3 className="section-title">Gameplay Mechanics</h3>
      <p className="section-caption">Explore the engaging system of Star Dust Adventures</p>
    </div>
  );
};

export type GamePlayCardListProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  linesRef: React.MutableRefObject<HTMLDivElement[]>;
};

/**
 * Renders a list of gameplay cards with connecting lines.
 * @param {GamePlayCardListProps} props - Props containing container and lines refs.
 * @returns {JSX.Element} A list of cards with animated lines.
 */
const GamePlayCardList = ({ containerRef, linesRef }: GamePlayCardListProps): JSX.Element => {
  return (
    <div ref={containerRef} className="gameplay-mechanics-cards">
      {CARDS.map((card, index) => (
        <React.Fragment key={index}>
          <GameplayMechanic {...card} />
          {index < CARDS.length - 1 && (
            <div
              className="w-1/4 h-0.5 bg-white bg-opacity-50 transform origin-left"
              ref={(el) => el && linesRef.current && (linesRef.current[index] = el)} // Validate `linesRef.current`
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * Main component for rendering the gameplay mechanics section, handling both desktop and mobile views.
 * @returns {JSX.Element} The gameplay mechanics section with animations.
 */
const GamePlayMechanics = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  // GSAP Animation Hook
  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;
    
    const cards = containerRef.current.querySelectorAll('.gameplay-card');
    const lines = linesRef.current;

    // Set initial animation properties
    gsap.set(cards, { opacity: 0, scale: 0.8 });
    gsap.set(lines, { scaleX: 0 });

    // Timeline for animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: true,
        scrub: 1,
      },
    });
    tl.to(cards, { opacity: 1, scale: 1, stagger: 0.2, duration: 0.5 })
      .to(lines, { scaleX: 1, duration: 0.5, stagger: 0.2 }, '<');

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);


    return(
    <section className="gameplay-mechanics" ref={sectionRef}>
      <Header />
      <GamePlayCardList linesRef={linesRef} containerRef={containerRef} />
    </section>
  );
};

export default GamePlayMechanics;
