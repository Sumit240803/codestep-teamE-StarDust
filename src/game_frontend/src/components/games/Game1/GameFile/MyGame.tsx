import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE } from "../../../../../../declarations/StarDustAdventures_backend/StarDustAdventures_backend.did";

export class MyGame extends Phaser.Game{
    public actor?: ActorSubclass<_SERVICE>;
    constructor(config : Phaser.Types.Core.GameConfig,actor : ActorSubclass<_SERVICE>){
        super(config);
        this.actor = actor;
    }
}