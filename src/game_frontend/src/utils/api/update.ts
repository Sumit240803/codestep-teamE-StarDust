import { ActorSubclass } from "@dfinity/agent"
import { _SERVICE } from "../../../../declarations/StarDustAdventures_backend/StarDustAdventures_backend.did"
import { useMutation, useQueryClient } from "react-query"
import api from "."

type CreateUserData={
    user : {name : string};
    refBy : any;
}


export const CREATE_USER = (actor : ActorSubclass<_SERVICE>, data : CreateUserData)=>{
    return useMutation(async()=>api.update(()=>actor.createUser(data.user, data.refBy)))
}

export const UPDATE_USER = (actor : ActorSubclass<_SERVICE>, data : User)=>{
    const queryClient = useQueryClient()
    return useMutation('user', async()=>api.update(()=>actor.updateUser(data)),{
        onSuccess : ()=>{
            queryClient.invalidateQueries('user')
        }
    })
}

export const MINE_CARD = (actor : ActorSubclass<_SERVICE>, card_id : bigint)=>{
    const queryClient = useQueryClient()
    return useMutation('user_card', async()=>api.update(()=>actor.mineCard(card_id)),{
        onSuccess : ()=>{
            queryClient.invalidateQueries('user_cards')
        }
    })
}

export const DISABLE_USER = (actor : ActorSubclass<_SERVICE>)=>{
    return useMutation('user',async()=>api.update(()=>actor.disableUser()))
}

export const INCREMENT_POINTS = (actor : ActorSubclass<_SERVICE>)=>{
    const queryClient = useQueryClient()
    return useMutation('points', async()=>api.update(()=>actor.incrementPoints()),{
        onSuccess : ()=>{
            queryClient.invalidateQueries('points')
        }  
    })
}