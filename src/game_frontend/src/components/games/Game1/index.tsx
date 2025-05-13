import { useEffect, useRef } from "react";
import RocketRush from "./GameFile/index";

import Phaser from "phaser";
import "./index.css"
import { StartScene } from "./GameFile/startScreen";
import { EndScreen } from "./GameFile/endScreen";
import { SelectScreen } from "./GameFile/selectScreen";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE } from "../../../../../declarations/StarDustAdventures_backend/StarDustAdventures_backend.did";
import { MyGame } from "./GameFile/MyGame";
export default function GamePage({actor} : {actor : ActorSubclass<_SERVICE>}){
    const gameRef = useRef<MyGame | null>(null);

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

      gameRef.current = new MyGame(config ,actor);
      gameRef.current.actor = actor;
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [actor]);

  return (
    <div className="game-wrapper">
      <div id="game-container" />
    </div>
  );
}