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
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl mb-4">Opções de Entrega</h2>
        <p>Escolha uma das opções de entrega disponíveis:</p>
        {/* Aqui você pode adicionar os detalhes das opções de entrega */}
        <ul>
          <li>Entrega padrão</li>
          <li>Entrega expressa</li>
          <li>Retirar no local</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default DeliveryModal;
