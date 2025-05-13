import { ActorSubclass } from '@dfinity/agent';
import React, { useEffect, useRef, useState } from 'react';
import { _SERVICE } from '../../../../../declarations/StarDustAdventures_backend/StarDustAdventures_backend.did';
import { useAddPoints } from '../../../utils/api/update';

type GameState = 'initial' | 'countdown' | 'playing' | 'paused' | 'over';
type ActorProp={
  actor : ActorSubclass<_SERVICE>;
}
const Game3 : React.FC<ActorProp> = ({actor}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('countdown');
  const [countdown, setCountdown] = useState(3);
  const mutation = useAddPoints(actor,BigInt(score));
  
  // Animation frame ref to store the ID
  const animationFrameIdRef = useRef<number | null>(null);

  // Start countdown timer logic
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout | undefined;
    if (gameState === 'countdown' && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (gameState === 'countdown' && countdown === 0) {
      setGameState('playing');
    }
    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [gameState, countdown]);

  // Game state watcher
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load assets
    const backgroundImage = new Image();
    backgroundImage.src = '/assets/images/game3/bg-1.svg';

    const playerImage = new Image();
    playerImage.src = '/assets/images/game3/player.png';

    const enemyImage = new Image();
    enemyImage.src = '/assets/images/game3/enemy.png'

    const bulletImage = new Image();
    bulletImage.src = '/assets/images/game3/bullet.png';

    const laserSound = new Audio('/assets/sounds/game3/laser.wav');
    const explosionSound = new Audio('/assets/sounds/game3/explosion.wav');

    // Game variables
    let playerX = 370;
    let playerY = 480;
    let playerXChange = 0;

    let enemies = Array.from({ length: 6 }, () => ({
      x: Math.random() * 736,
      y: Math.random() * 100 + 50,
      xChange: 4,
      yChange: 40,
    }));

    let bulletX = 0;
    let bulletY = 480;
    let bulletState = 'ready';

    // Reset game state
    const resetGame = () => {
      playerX = 370;
      playerXChange = 0;
      enemies = Array.from({ length: 6 }, () => ({
        x: Math.random() * 736,
        y: Math.random() * 100 + 50,
        xChange: 4,
        yChange: 40,
      }));
      bulletX = 0;
      bulletY = 480;
      bulletState = 'ready';
      setScore(0);
    };

    // Key event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && gameState === 'over') {
        resetGame();
        setGameState('countdown');
        setCountdown(3);
        return;
      }
      if (e.key === 'p' || e.key === 'P') {
        if (gameState === 'playing') {
          setGameState('paused');
        } else if (gameState === 'paused') {
          setGameState('playing');
        }
        return;
      }
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowLeft') playerXChange = -5;
      if (e.key === 'ArrowRight') playerXChange = 5;
      if (e.key === ' ') {
        if (bulletState === 'ready') {
          bulletState = 'fire';
          bulletX = playerX;
          laserSound.play();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') playerXChange = 0;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Collision detection
    const isCollision = (x1: number, y1: number, x2: number, y2: number): boolean => {
      const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      return distance < 27;
    };

    // Helper function to draw centered text
    const drawCenteredText = (context: CanvasRenderingContext2D, text: string, fontSize: number, x: number, y: number): void => {
      context.fillStyle = 'white';
      context.font = `${fontSize}px Arial`;
      context.textAlign = 'center';
      context.fillText(text, x, y);
      context.textAlign = 'start'; // Reset alignment
    };

    // Game loop
    const gameLoop = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(playerImage, playerX, playerY, 64, 64);

      if (gameState === 'initial') {
        drawCenteredText(ctx, 'SPACE SHOOTER', 64, canvas.width / 2, 200);
        drawCenteredText(ctx, 'Press Start to play', 32, canvas.width / 2, 280);
      } else if (gameState === 'countdown') {
        drawCenteredText(ctx, countdown.toString(), 128, canvas.width / 2, canvas.height / 2);
      } else if (gameState === 'paused') {
        drawCenteredText(ctx, 'PAUSED', 64, canvas.width / 2, canvas.height / 2 - 40);
        drawCenteredText(ctx, 'Press P to resume', 32, canvas.width / 2, canvas.height / 2 + 40);
      } else if (gameState === 'over') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawCenteredText(ctx, 'GAME OVER', 64, canvas.width / 2, canvas.height / 2 - 50);
        drawCenteredText(ctx, `Final Score: ${score}`, 40, canvas.width / 2, canvas.height / 2 + 20);
        drawCenteredText(ctx, 'Press Enter to Restart', 32, canvas.width / 2, canvas.height / 2 + 80);
      } else if (gameState === 'playing') {
        playerX += playerXChange;
        if (playerX <= 0) playerX = 0;
        if (playerX >= 736) playerX = 736;

        enemies.forEach((enemy) => {
          enemy.x += enemy.xChange;
          if (enemy.x <= 0 || enemy.x >= 736) {
            enemy.xChange *= -1;
            enemy.y += enemy.yChange;
          }
          if (enemy.y > 440) {
            setGameState('over');
          }
          if (isCollision(enemy.x, enemy.y, bulletX, bulletY)) {
            explosionSound.play();
            bulletY = 480;
            bulletState = 'ready';
            setScore((prev) => prev + 1);
            enemy.x = Math.random() * 736;
            enemy.y = Math.random() * 100 + 50;
          }
          ctx.drawImage(enemyImage, enemy.x, enemy.y, 64, 64);
        });

        if (bulletState === 'fire') {
          ctx.drawImage(bulletImage, bulletX + 16, bulletY, 32, 32);
          bulletY -= 10;
        }
        if (bulletY <= 0) {
          bulletY = 480;
          bulletState = 'ready';
        }
      }

      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.fillText(`Score: ${score}`, 10, 30);

      if (gameState === 'playing') {
        animationFrameIdRef.current = requestAnimationFrame(gameLoop);
      }
    };

    // Start or update game loop based on game state
    if (gameState === 'playing') {
      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    } else {
      gameLoop(performance.now()); // Draw the current state once
    }

    // Cleanup function
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, countdown, score]);
  useEffect(()=>{
    if (gameState === "over" && score > 0){
      mutation.mutate();
    }
  },[gameState])

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div className="relative">
        <canvas ref={canvasRef} width={800} height={600} className="border-4 border-gray-800 rounded-lg shadow-lg"></canvas>
      </div>
    </div>
  );
};

export default Game3;