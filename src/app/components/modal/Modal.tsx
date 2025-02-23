// Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative bg-white p-6 w-96 shadow-lg">
       
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-[#F80305] text-xl"
        >
          X
        </button>

        <h2 className="text-xl mb-4">Cupons de Desconto</h2>
        <p>Não há cupons de desconto ativos no momento!</p>
      </div>
    </div>
  );
};

export default Modal;
