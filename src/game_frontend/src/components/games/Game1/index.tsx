import { useEffect, useRef } from "react";
import RocketRush from "./GameFile/index";

import Phaser from "phaser";
import "./index.css"
import { StartScene } from "./GameFile/startScreen";
import { EndScreen } from "./GameFile/endScreen";
import { SelectScreen } from "./GameFile/selectScreen";
export default function GamePage(){
    const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: 1024,
        height: 512,
        parent: 'game-container',
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
          },
        },
        scene: [SelectScreen,StartScene,RocketRush,EndScreen],
      };

      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="game-wrapper">
      <div id="game-container" />
    </div>
  );
}