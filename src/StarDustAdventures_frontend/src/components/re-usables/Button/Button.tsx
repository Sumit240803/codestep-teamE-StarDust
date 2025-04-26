import clsx from "clsx";
import './index.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
}
/**
 * Reusable Button Component for StarDust Adventures
 * 
 * This is a reusable button component that can be used across the StarDust Adventures project.
 * It accepts various props to control its styling and behavior.
 * The button uses Tailwind CSS classes, and `clsx` is used to combine the styles dynamically.
 * 
 * @component
 * @param {ButtonProps} props - The props for the Button component
 * @param {'primary' | 'secondary'} [props.variant='primary'] - Defines the button variant (color scheme)
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'xxl'} [props.size='md'] - Defines the size of the button
 * @param {string} [props.className] - Additional class names to apply custom styles
 * @param {React.ReactNode} props.children - The content to be rendered inside the button
 * @returns {JSX.Element} The rendered button component
 * 
 * @example
 * // Example usage of the Button component
 * <Button variant="primary" size="lg">
 *   Click Me
 * </Button>
 * 
 * @example
 * <Button variant="secondary" size="sm" className="custom-class">
 *   Submit
 * </Button>
 * 
 * @version 1.0
 * @author @ArjunQBTech
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps): JSX.Element {

  const sizes = {
    'sm': 'text-sm min-w-[100px] text-[20px]',
    'md': 'min-w-[185px] text-[30px]',
    'lg': 'text-base px-6 py-2',
    'xl': 'text-lg px-8 py-3',
    'xxl': 'text-xl px-10 py-3'
  };

  const vSpacing = {
    'sm': 'my-1',
    'md': 'my-2',
    'lg': 'my-3',
    'xl': 'my-4',
    'xxl': 'my-5'
  };

  return (
    <button 
      {...props} 
      className={clsx(
        variant, // Button variant styling
        sizes[size], // Dynamic size classes
        vSpacing[size], // Vertical spacing
        className, // Additional user-defined class names
        'button' // Base button class
      )}
    >
      <div className={clsx('button-children')}>
        {children}
      </div>
    </button>
  );
}
