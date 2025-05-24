import React from 'react'
import Market from '../../../ui/MarketPlace';
import "./index.css"
import { useAuth } from '../../../../hooks/useAuth';
import { buyNFT } from '../../../../utils/api/update';
interface MarketPlaceProps {
  MarketData : MarketData[];
}
const Owned : React.FC<MarketPlaceProps>= ({MarketData}) => {
    
  return (
    <div className='market-grid'>
      {MarketData?.map((data)=>(
        <Market
        id={data.id}
        name={data.name}
        price={data.price}
        img={data.img}
        
        />
      ))}
    </div>
  )
}

export default Owned