import React, { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";

const ModalContext = createContext(null);

export interface ModalProvider {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  addOnCloseHandler: (handler: () => void) => void;
}

export const ProvideModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [onCloseHandlers, setOnCloseHandlers] = useState<(() => void)[]>([]);

  const closeModal = () => {
    onCloseHandlers.forEach((handler) => handler());
    setIsOpen(false);
  };

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const addOnCloseHandler = (handler: () => void) => {
    setOnCloseHandlers((prev) => [...prev, handler]);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, addOnCloseHandler }}>
      <Modal isOpen={isOpen} onClose={() => closeModal()}>
        {modalContent}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  return useContext(ModalContext);
};

export default useModal;
