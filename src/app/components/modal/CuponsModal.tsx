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
          className="absolute top-2 right-2 text-gray-500 text-2xl bg-[#E5E7EB] rounded-full hover:bg-[#FFFFFF]"
        >
          <svg className="size-8" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#374151">
            <path d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
          </svg>
        </button>

        <h2 className="text-xl mb-4">Cupons de Desconto</h2>
        <p>Não há cupons de desconto ativos no momento!</p>
      </div>
    </div>
  );
};

export default Modal;
