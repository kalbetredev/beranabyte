import React, { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";

const ModalContext = createContext(null);

export interface ModalProvider {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const ProvideModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
