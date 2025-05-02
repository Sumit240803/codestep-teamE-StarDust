import React, { useState, useEffect, useRef, useReducer } from 'react';
import bg from "/assets/images/game1/bg.svg";
import rocket from "/assets/images/game1/rocket.svg";
import meteor from "/assets/images/game1/meteor.svg";
import collision from "/assets/sounds/collision-1.mp3";
import bgMusic from "/assets/sounds/bg-sound-1.mp3";
import jump from "/assets/sounds/jump-1.mp3";

// Constants
const GRAVITY = 0.6;
const JUMP_HEIGHT = -8;
const OBSTACLE_SPEED = 15;
const SCORE_UPDATE_INTERVAL = 200;

const gameReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_GAME_OVER':
      return { ...state, gameOver: true };
    case 'START_GAME':
      return { ...state, gameStarted: true };
    case 'UPDATE_SCORE':
      return { ...state, score: action.payload };
    case 'UPDATE_ROCKET_POSITION':
      return { ...state, rocketPosition: action.payload };
    case 'UPDATE_OBSTACLES':
      return { ...state, obstacles: action.payload };
    case 'SET_COUNTDOWN':
      return { ...state, countdown: action.payload };
    case 'RESTART_GAME':
      return {
        gameOver: false,
        gameStarted: false,
        countdown: 5,
        score: 0,
        rocketPosition: window.innerHeight / 2,
        obstacles: [],
      };
    default:
      return state;
  }
};

const Game1 = () => {
  const rocketRef = useRef<HTMLImageElement>(null);
  const rocketVelocityRef = useRef(0);
  const rocketPositionRef = useRef(window.innerHeight / 2);
  const lastScoreUpdateRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const obstaclesRef = useRef<{ left: number; top: number }[]>([]);
  const collisonRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const jumpAudioRef = useRef<HTMLAudioElement | null>(null);
  const imagesRef = useRef<{ bg: HTMLImageElement; rocket: HTMLImageElement; meteor: HTMLImageElement } | null>(null);

  const [state, dispatch] = useReducer(gameReducer, {
    gameOver: false,
    gameStarted: false,
    countdown: 3,
    score: 0,
    rocketPosition: window.innerHeight / 2,
    obstacles: [],
  });

  useEffect(() => {
    if (state.countdown === 0) {
      dispatch({ type: 'SET_COUNTDOWN', payload: "Go!" });
      setTimeout(() => {
        dispatch({ type: 'SET_COUNTDOWN', payload: null });
        dispatch({ type: 'START_GAME', payload: true });
      }, 500);
      return;
    }

    if (typeof state.countdown === 'number') {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_COUNTDOWN', payload: state.countdown - 1 });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.countdown]);

  useEffect(() => {
    let animationFrame: number;
    const obstaclePool: { left: number; top: number }[] = [];
    if (!state.gameStarted || state.gameOver) return;
  
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return;
  const render = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    /*// Draw background
    const bgImage = new Image();
    bgImage.src = bg;
    ctx.drawImage(bgImage, 0, 0, window.innerWidth, window.innerHeight);
    
    // Draw rocket
    const rocketImg = new Image();
    rocketImg.src = rocket;
    ctx.drawImage(rocketImg, 150, rocketPositionRef.current, 190, 70);
    
    // Draw obstacles
    const meteorImg = new Image();
    meteorImg.src = meteor;
    obstaclesRef.current.forEach(obs => {
      ctx.drawImage(meteorImg, obs.left, obs.top, 100, 100);
    });*/
    if (imagesRef.current) {
      const { bg, rocket, meteor } = imagesRef.current;
      ctx.drawImage(bg, 0, 0, window.innerWidth, window.innerHeight);
      ctx.drawImage(rocket, 150, rocketPositionRef.current, 190, 70);
      obstaclesRef.current.forEach(obs => {
        ctx.drawImage(meteor, obs.left, obs.top, 100, 100);
      });
    }
    
  };
    const gameLoop = () => {
      render();
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTimeRef.current;

      rocketVelocityRef.current += GRAVITY;
      rocketPositionRef.current += rocketVelocityRef.current;
      rocketPositionRef.current = Math.max(0, Math.min(window.innerHeight - 90, rocketPositionRef.current));

      obstaclesRef.current = obstaclesRef.current
        .map(obs => ({ ...obs, left: obs.left - OBSTACLE_SPEED }))
        .filter(obs => obs.left > -100);

        if (Math.random() < 0.016 && obstaclesRef.current.length < 5) {
          const newObstacle = obstaclePool.pop() || { left: window.innerWidth, top: 0 };
          newObstacle.left = window.innerWidth;
          newObstacle.top = Math.random() * (window.innerHeight - 100);
          obstaclesRef.current.push(newObstacle);
        }
        obstaclesRef.current = obstaclesRef.current.filter(obs => {
          if (obs.left <= -100) {
            obstaclePool.push(obs);
            return false;
          }
          return true;
        });
      if(obstaclesRef.current.length > 10){
        obstaclesRef.current = obstaclesRef.current.slice(-10);
      }
      if (obstaclesRef.current.length !== state.obstacles.length || 
        obstaclesRef.current.some((obs, i) => obs.left !== state.obstacles[i]?.left)) {
      dispatch({ type: 'UPDATE_OBSTACLES', payload: obstaclesRef.current });
    }

    if (Math.abs(state.rocketPosition - rocketPositionRef.current) > 1) {
      dispatch({ type: 'UPDATE_ROCKET_POSITION', payload: rocketPositionRef.current });
    }

      if (currentTime - lastScoreUpdateRef.current >= SCORE_UPDATE_INTERVAL) {
        lastScoreUpdateRef.current = currentTime;
        dispatch({ type: 'UPDATE_SCORE', payload: Math.floor((currentTime - startTimeRef.current) / 1000) });
      }

      if (checkCollision()) {
        collisonRef.current?.play();
        dispatch({ type: 'SET_GAME_OVER' });
        return;
      }

      dispatch({ type: 'UPDATE_ROCKET_POSITION', payload: rocketPositionRef.current });
      dispatch({ type: 'UPDATE_OBSTACLES', payload: obstaclesRef.current });

      animationFrame = requestAnimationFrame(gameLoop);
    };

    if (state.gameStarted && !state.gameOver) {
      startTimeRef.current = Date.now();
      lastScoreUpdateRef.current = Date.now();
      animationFrame = requestAnimationFrame(gameLoop);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [state.gameStarted, state.gameOver]);

  const handleJump = () => {
    if (!state.gameStarted || state.gameOver) return;
    rocketVelocityRef.current = JUMP_HEIGHT;
    if (jumpAudioRef.current) {
      jumpAudioRef.current.currentTime = 0;
      jumpAudioRef.current.play();
    }
  };

  const handleRestart = () => {
    rocketVelocityRef.current = 0;
    rocketPositionRef.current = window.innerHeight / 2;
    obstaclesRef.current = [];
    dispatch({ type: 'RESTART_GAME' });
  };

  const checkCollision = () => {
    for (const obs of obstaclesRef.current) {
      if (
        obs.left < 80 && obs.left > 0 &&
        rocketPositionRef.current < obs.top + 80 &&
        rocketPositionRef.current + 70 > obs.top
      ) {
        return true;
      }
    }
    if (rocketPositionRef.current <= 0 || rocketPositionRef.current >= window.innerHeight - 90) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (state.gameStarted && !state.gameOver) {
      bgMusicRef.current?.play().catch(() => {});
    } else {
      bgMusicRef.current?.pause();
      if (bgMusicRef.current) bgMusicRef.current.currentTime = 0;
    }
  }, [state.gameStarted, state.gameOver]);
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const bgImg = new Image();
    const rocketImg = new Image();
    const meteorImg = new Image();
    bgImg.src = bg;
    rocketImg.src = rocket;
    meteorImg.src = meteor;
    imagesRef.current = { bg: bgImg, rocket: rocketImg, meteor: meteorImg };
  }, []);  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div
      onClick={handleJump}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'Arial, sans-serif'
      }}

    >
      <canvas ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ position: 'absolute', top: 0, left: 0 }}/>
      {/* Score */}
      {state.gameStarted && !state.gameOver && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '32px',
          color: 'white'
        }}>
          Score: {state.score}
        </div>
      )}

      {/* Rocket */}
      <img
        ref={rocketRef}
        src={rocket}
        alt="Rocket"
        style={{
          width: '190px',
          height: '70px',
          position: 'absolute',
          left: '150px',
          top: `${state.rocketPosition}px`,
        }}
      />

      {/* Obstacles */}
      {state.obstacles.map((obs: any, index: number) => (
        <img
          key={index}
          src={meteor}
          alt="Meteor"
          style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            left: `${obs.left}px`,
            top: `${obs.top}px`,
          }}
        />
      ))}

      {/* Countdown */}
      {state.countdown !== null && (
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '50px',
          color: 'yellow'
        }}>
          {state.countdown}
        </div>
      )}

      {/* Game Over */}
      {state.gameOver && (
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 0 20px rgba(255, 0, 0, 0.8)'
        }}>
          <h1 style={{ fontSize: '48px', color: 'red', marginBottom: '10px' }}>Game Over</h1>
          <p style={{ fontSize: '24px', marginBottom: '20px' }}>Your Score: {state.score}</p>
          <button
            onClick={handleRestart}
            style={{
              fontSize: '20px',
              padding: '10px 30px',
              backgroundColor: '#ffcc00',
              color: '#000',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Restart
          </button>
        </div>
      )}

      {/* Sounds */}
      <audio ref={collisonRef} src={collision} />
      <audio ref={bgMusicRef} src={bgMusic} loop />
      <audio ref={jumpAudioRef} src={jump} />
    </div>
  );
};

export default Game1;