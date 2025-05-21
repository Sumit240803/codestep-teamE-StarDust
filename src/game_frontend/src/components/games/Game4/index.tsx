import { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "./GameFiles/GameScene";
import StartScene from "./GameFiles/StartScene";
import EndScene from "./GameFiles/EndScene";
import { ActorSubclass } from "@dfinity/agent";

import { MyGameConfig } from "./GameConfig";
import { _SERVICE } from "../../../../../declarations/StarDustAdventures_backend/StarDustAdventures_backend.did";

export default function Game4({actor} : {actor : ActorSubclass<_SERVICE>}) {
  const gameRef = useRef<MyGameConfig | null>(null);
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
        scene: [StartScene, GameScene,EndScene]
      };

      gameRef.current = new MyGameConfig(config,actor);
      gameRef.current.actor = actor;
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
