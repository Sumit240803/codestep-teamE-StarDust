import "./index.css"
interface MarketProps {
    id: bigint;
    name: string;
    img: string;

    price: bigint;
    onClick? : ()=> void;
}

const Market : React.FC<MarketProps> = ({
    id,name,img,price ,onClick
})=>{
    return(
    <div className="mine-card-wrapper" onClick={onClick}>
          <div className="mine-card card-css">
            <div>
              <div className="mine-card-image-container">
                <img
                  src={img}
                  alt="Card-imgs"
                  className="mine-card-image"
                />
              </div>
            </div>
            <div className="mine-card-content">
              <div className="mine-card-header">
                <h3 className="mine-card-title">{name}</h3>
                <p className="mine-card-subtitle">{price.toString()}</p>
              </div>
              
              <div className="mine-card-stats">
               
               
              </div>
    
              <div className="mine-card-divider-container">
                <div className="mine-card-divider"></div>
              </div>
              
            </div>
          </div>
        </div>)
}


export default Market;