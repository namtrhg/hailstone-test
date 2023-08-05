import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-70 bg-primary flex items-center justify-center z-50">
      <div className="bg-[#1F3641] w-screen h-[266px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
