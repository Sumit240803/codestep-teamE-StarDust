import React, { createContext, useContext } from 'react';

const ModalContext = createContext<ModalContextProps | null>(null);

/**
    * @file The useModal hook is a custom hook that returns the ModalContext
    * @returns {React.PropsWithChildren} The ModalContext
    * @version 1.0
    * @example
    * // Example usage of the useModal hook
    * const {onClose} = useModal();
    * @author Arjun Sharma
    * @ArjunQBTech
*/
export const useModal = () => useContext(ModalContext);
/**
    * @file The ModalProvider component is a wrapper component that provides the ModalContext to its children
    * @version 1.0
*/
const ModalProvider = ({ children, ...props }: ModalContextProps) => {
  return (
    <ModalContext.Provider value={props}>
      <div className="modal-parent">{children}</div>
    </ModalContext.Provider>
  );
};

export default ModalProvider;