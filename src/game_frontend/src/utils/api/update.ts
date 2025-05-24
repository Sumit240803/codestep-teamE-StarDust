import { ActorSubclass } from "@dfinity/agent"
import { _SERVICE } from "../../../../declarations/StarDustAdventures_backend/StarDustAdventures_backend.did"
import { _SERVICE as nftService } from "../../../../declarations/nft_canister/nft_canister.did"
import { useMutation, useQueryClient } from "react-query"
import api from "."
import { useAuth } from "../../hooks/useAuth"
import { Principal } from "@dfinity/principal"


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
export const useAddPoints = (actor: ActorSubclass<_SERVICE>, score: bigint) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['score'],
    mutationFn: async () => api.update(() => actor.incrementScore(score)),
    onSuccess: () => {
      queryClient.invalidateQueries('score');
    },
  });
};

export const pointsToToken = (actor : ActorSubclass<_SERVICE>)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ['tokens'],
        mutationFn : async(points : bigint)=> api.update(()=>actor.convertToTokens(points)),
        onSuccess : ()=>{
            queryClient.invalidateQueries('tokens');
        }
    })
}
export const buyNFT = (actor: ActorSubclass<nftService>,tokenActor :any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['nfts'],
    mutationFn: async ({ id, price }: { id: any; price: any }) => {
      const nftCanId = process.env.CANISTER_ID_NFT_CANISTER!;

      

      await approvedNFTspending({ amount: price, nftCanId,tokenActor });
      return api.update(() => actor.buyNft(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries('nfts');
      console.log('Purchased');
    },
    onError: (err) => {
      console.log('Error purchasing NFT:', err);
    },
  });
};

async function approvedNFTspending({ amount, nftCanId,tokenActor}: { amount: any,nftCanId : string,tokenActor : any} ){
   /* const auth = useAuth();
    const tokenActor = auth?.tokenActors;*/
   const result = await tokenActor.icrc2_approve({
    from_subaccount: [],
    spender: {
      owner: Principal.fromText(nftCanId),
      subaccount: [],
    },
    amount: BigInt(String(amount)),
    expires_at: [],
    expected_allowance: [],
    fee: [],
    memo: [],
    created_at_time: [],
  });
  console.log("Result Approved",result);
}