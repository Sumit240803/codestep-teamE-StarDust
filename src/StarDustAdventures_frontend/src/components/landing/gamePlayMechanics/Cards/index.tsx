import './index.css'
// Card Props
export type CardProps = {
    title : string;
    description : string;
    image : string;
}

/**
 * A Card component that displays a gameplay mechanic for desktop view. 
 * It includes an image, title, and description.
 *
 * @param {CardProps} props - The card properties.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the gameplay mechanic.
 * @param {string} props.image - The image URL representing the gameplay mechanic.
 * @returns {JSX.Element} A styled card with an image, title, and description for large screen sizes ( > 768px).
 */
const Card = ({title, description,image}:CardProps)=>{
    return(
        <div aria-roledescription='card' role='section' className="gameplay-card">
            <img src={image} alt={title} title={title} width={86} height={86}/>
            <h4 className='card-title'>{title}</h4>
            <p className='card-description'>{description}</p>
        </div>
    )
}

export default Card;