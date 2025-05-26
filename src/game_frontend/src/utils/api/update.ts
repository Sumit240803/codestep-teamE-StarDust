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
    mutationFn: async ({ id, price,userPrincipal }: { id: any; price: any,userPrincipal : any }) => {
      const nftCanId = process.env.CANISTER_ID_NFT_CANISTER!;

      console.log("Approving Result for NFT Canister Id",nftCanId,' .....');

     const approveResult = await approvedNFTspending({ amount: price, nftCanId,tokenActor });
      if ("Err" in approveResult) {
  console.error("Approval failed:", approveResult.Err);
  return;
}
console.log("Wating For 1 second before tranfer",' .....');
await new Promise((res) => setTimeout(res, 1000));
console.log("Transferring Result for NFT Canister Id",nftCanId,'with tokenActor',tokenActor, "and user principal" , userPrincipal ,'for amount ', price  ,' .....');
const transferResult = await transfer({tokenActor,fromPrincipal : userPrincipal.toText(),toPrincipal : nftCanId , amount : price});
if("Err" in transferResult){
  console.log("Error tranferring : ", transferResult.Err);
  return;
}
      
console.log("Buying NFT Now.....")
      return api.update(() => actor.buyNft(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries('nfts');
      queryClient.invalidateQueries('owned');
      console.log('Purchased');
    },
    onError: (err) => {
      console.log('Error purchasing NFT:', err);
    },
  });
};
async function approvedNFTspending({
  amount,
  nftCanId,
  tokenActor
}: {
  amount: number,
  nftCanId: string,
  tokenActor: any
}) {
  const result = await tokenActor.icrc2_approve({
    from_subaccount: [], // means default subaccount
    spender: {
      owner: Principal.fromText(nftCanId),
      subaccount: [], // also default
    },
    amount: BigInt(amount),
    expires_at: [],           // no expiration
    expected_allowance: [],   // no expected value
    fee: [],                  // use default fee
    memo: [],
    created_at_time: [],
  });

  console.log("✅ Approved result:", result);
  return result;
}

async function transfer({
  tokenActor,
  fromPrincipal,
  toPrincipal,
  amount,
}: {
  tokenActor: any;
  fromPrincipal: string;
  toPrincipal: string;
  amount: number ;
}) {
  const result = await tokenActor.icrc2_transfer_from({
    spender_subaccount: [], 
    from: {
      owner: Principal.fromText(fromPrincipal),
      subaccount: [], 
    },
    to: {
      owner: Principal.fromText(toPrincipal),
      subaccount: [], 
    },
    amount: BigInt(amount),
    fee: [],
    memo: [],
    created_at_time: [],
  });

  console.log("🔁 Transfer result:", result);
  return result;
}
