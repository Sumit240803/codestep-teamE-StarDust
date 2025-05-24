import React from 'react'
import Market from '../../../ui/MarketPlace';
interface MarketPlaceProps {
  MarketData : MarketData[];
}
const MarketPlace : React.FC<MarketPlaceProps>= ({MarketData}) => {
  return (
    <div>
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

export default MarketPlace