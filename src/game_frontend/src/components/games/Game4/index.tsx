import { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "./GameFiles/GameScene";

export default function Game4() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: 1024,
        height: 512,
        parent: containerRef.current,
        physics: {
          default: 'arcade',
          arcade: {
            debug: false
          }
        },
        scene: [GameScene]
      };

      gameRef.current = new Phaser.Game(config);
    }

    // Cleanup Phaser game on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="game-container"
      ref={containerRef}
     
    />
  );
}
