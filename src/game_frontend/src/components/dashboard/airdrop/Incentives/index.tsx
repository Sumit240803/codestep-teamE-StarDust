import InfoToolTip from '../InfoToolTip'
import './index.css'

const INCENTIVES_DETAILS = [
    {
        icon: '/assets/images/HODL.svg',
        points: 100,
        type: 'Passive Income'
    },
    {
        icon: '/assets/images/Review.svg',
        points: 50,
        type: 'Earn Tasks'
    },
    {
        icon: '/assets/images/Vested.svg',
        points: 25,
        type: 'Friends'
    },
    {
        icon : '/assets/images/rocket.svg',
        points: 0,
        type : 'Acheivements'
    },
    {
        icon : '/assets/images/Review.svg',
        points : 0,
        type : 'Keys'
    }
] as Array<Incentives>

/**
 * @description Incentive Card UI to show Individual Incentives
 * @params {Incentives}
 * @type {Functional Component}
 */
const IncentiveCard=({icon, points = 0, type} : Incentives)=>{
    return(
        <div role='group' className='incentive-card'>
            <div>
                <div className='flex space-x-4'>
                  <img src={icon} title={type} alt={type} width={30} height={30} loading='lazy'/>

                  <div className='incentive-card-type'>
                    <p>{type}</p>
                    <div className='incentive-card-type-points'>
                        <img src='/assets/images/ufo.svg' alt='ufo' width={20} height={20} loading='lazy'/>
                        <p>{points.toString()}</p>
                        
                    </div>
                  </div>
                </div>
            </div>
            <div className='incentive-info-svg'>
                <InfoToolTip title ={type} />
            </div>  
        </div>
    )
}

const Incentives=()=>{
    return(
        <div className='incentive-group'>
            {INCENTIVES_DETAILS.map((incentive, index)=>{
                return(
                    <IncentiveCard key={index} {...incentive} />
                )
            })}
        </div>
    )
}
export default Incentives