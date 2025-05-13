import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE } from "../../../../../../declarations/StarDustAdventures_backend/StarDustAdventures_backend.did";


export const addPoints = async(actor : ActorSubclass<_SERVICE>,score : bigint)=>{
    return await actor.incrementScore(score);
}