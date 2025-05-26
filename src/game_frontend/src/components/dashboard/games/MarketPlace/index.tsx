import React from 'react'
import Market from '../../../ui/MarketPlace';
import "./index.css"
import { useAuth } from '../../../../hooks/useAuth';
import { buyNFT } from '../../../../utils/api/update';
import { useTokens } from '../../../../hooks/useTokens';
interface MarketPlaceProps {
  MarketData : MarketData[];
}

const MarketPlace : React.FC<MarketPlaceProps>= ({MarketData}) => {
  const auth = useAuth();
    const nftActor = auth?.nftActors;
    const tokenActor = auth?.tokenActors;
    const { tokens} = useTokens();
    const {mutate,isLoading} =nftActor && tokenActor ? buyNFT(nftActor,tokenActor) : {mutate : ()=>{}};
    /*async function getBalance(){
      const balance =await tokenActor.icrc1_balance_of({
  owner: auth?.principal!,
  subaccount: [], // or try an empty array `[]`
});*/
//console.log("User balance:", tokens);
//console.log("Frontend Principal:", auth?.principal?.toText());

 //getBalance();
    

  return (
    <div className='market-grid'>
      {MarketData?.map((data)=>(
        <Market
        key={data.id}
        id={data.id}
        name={data.name}
        price={data.price}
        img={data.img}
        onClick={()=> mutate({id :data.id,price :data.price, userPrincipal : auth?.principal})}
        isLoading = {isLoading}
        />
      ))}
    </div>
  )
}

export default MarketPlace