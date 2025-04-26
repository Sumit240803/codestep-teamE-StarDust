import { useCallback, useEffect, useRef } from "react";
import ModalProvider from "../../../hooks/useModal";
import { motion } from "framer-motion";
import clsx from "clsx";
import './index.css';



const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1,  transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Modal ({children, onClose, size='small', style={}, ...props} : ModalProps) {
  const modalSize = {
    small: 'w-[40vw]  h-[40vh]  ',
    medium: 'w-1/2',
    large: 'w-2/3',
  }
 

  

  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if(dialogRef.current){
      dialogRef.current.showModal();
      document.addEventListener('keydown', handleKeyDown);
    }
    // Cleanup function to remove the event listener and close the dialog
    return () => {
      if(dialogRef.current){
        dialogRef.current.close();
      }
      // Cleanup the event listener 
      document.removeEventListener('keydown', handleKeyDown);
    }
  },[onclose])



  const handleOutsideClick = useCallback((e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(dialogRef.current && !dialogRef.current.contains(e.target as Node)){
      onClose()
    }
  }, [dialogRef.current])


  return (
    <ModalProvider {...props} onClose={onClose}>
      <motion.div className="modal-container" aria-modal="true" role="dialog"
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={handleOutsideClick}
      >
        <motion.dialog ref={dialogRef} className={clsx(
          'modal-container-body',
          modalSize[size],
          'overflow-visible'
        )}
        style={style}
        onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="modal-container-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
          >
            {children}
          </motion.div>
        </motion.dialog>

      </motion.div>
    </ModalProvider>
  );
}