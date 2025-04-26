
interface ModalContextProps extends React.PropsWithChildren {
    onClose: () => void;
}

interface ModalProps extends React.PropsWithChildren {
    onClose: () => void;
    size?: 'small' | 'medium' | 'large';
    style?: React.CSSProperties;
}