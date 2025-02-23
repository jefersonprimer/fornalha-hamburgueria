// DeliveryModal.tsx
import React from "react";

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 w-90 relative"> {/* Adicione 'relative' aqui */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
        >
          &times; {/* Usando o símbolo "×" como ícone */}
        </button>
        <h2 className="text-xl mb-4">Opções de Entrega</h2>
        <p>Escolha uma das opções de entrega disponíveis:</p>
        {/* Aqui você pode adicionar os detalhes das opções de entrega */}
        <ul>
          <li>Entrega padrão</li>
          <li>Entrega expressa</li>
          <li>Retirar no local</li>
        </ul>
      </div>
    </div>
  );
};

export default DeliveryModal;
