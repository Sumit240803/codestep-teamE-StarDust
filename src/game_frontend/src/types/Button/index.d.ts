/**
 * Button component props
 * @typedef {Object} ButtonProps
 * @property {string} [variant] - The variant of the button
 * @property {string} [size] - The size of the button
 * @property {string} [className] - Additional class names to apply custom styles
 * @property {React.ReactNode} children - The content to be rendered inside the button
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>} props - Additional props to be passed to the button
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'xs' |'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    className?: string;
  }