import React from "react";
import { useModal } from "../../../hooks/useModal";

// Modal.Header
export const ModalHeader = ({ children } : React.PropsWithChildren) => (
    <div className=" mb-4 pb-5 relative">
      {children}
    </div>
  );
  
  // Modal.CloseBtn
  export const ModalCloseBtn = () => {
    const modalContext = useModal();
    const onClose = modalContext ? modalContext.onClose : () => {}; // If modalContext is null, onClose is an empty function
    return (
      <button
        className="modal-close"
        onClick={onClose}
      >
       <img src='/assets/images/close.svg' alt='close' title="close" aria-describedby="close-button" 
       loading="lazy" width={20} height={20} />
      </button>
    );
  };
  
  // Modal.Body
  export const ModalBody = ({ children }: React.PropsWithChildren) => (
    <div className="modal-body flex flex-col  gap-3">
      {children}
    </div>
  );
  
  // Modal.Description
  export const ModalDescription = ({ children }: React.PropsWithChildren) => (
    <p className="text-sm text-gray-500">
      {children}
    </p>
  );
  
  export const ModalTitle = ({children}:React.PropsWithChildren) => (
    <h3 className="lg:text-2xl font-semibold text-white font-coin">
      {children}
    </h3>
  )