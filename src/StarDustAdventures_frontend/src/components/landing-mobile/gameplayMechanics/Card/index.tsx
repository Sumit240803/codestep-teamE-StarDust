import { CardProps } from "../../../landing/gamePlayMechanics/Cards";
import './index.css';

/**
 * A Card component that displays a gameplay mechanic.
 * It includes an image, title, and description.
 *
 * @param {CardProps} props - The card properties.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the gameplay mechanic.
 * @param {string} props.image - The image URL representing the gameplay mechanic.
 * @returns {JSX.Element} A styled card with an image, title, and description.
 */
export default function Card({ title, description, image }: CardProps): JSX.Element {
    return (
        <div aria-roledescription='card' role="region" className="mob-gameplay-card">
            <img src={image} alt={title} title={title} width={86} height={86} />
            <h4 className='card-title'>{title}</h4>
            <p className='card-description'>{description}</p>
        </div>
    );
}
