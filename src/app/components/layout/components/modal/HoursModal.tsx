// components/modal/HoursModal.tsx
import React from "react";

interface HoursModalProps {
  onClose: () => void;
}

const HoursModal: React.FC<HoursModalProps> = ({ onClose }) => {
  return (
    <div className="absolute mt-[55px] mr-[200px] top-5 right-20 w-84 bg-white text-black p-4 shadow-lg z-50">
      <h3 className="text-lg font-bold mb-2">Horários de Funcionamento</h3>
      <ul className="text-sm">
        <li><strong>DOM:</strong> 18:00 às 23:00</li>
        <li><strong>SEG:</strong> 18:00 às 23:30</li>
        <li><strong>QUA:</strong> 18:00 às 23:00</li>
        <li><strong>QUI:</strong> 18:00 às 23:00</li>
        <li><strong>SEX:</strong> 18:00 às 23:00</li>
        <li><strong>SÁB:</strong> 18:00 às 23:00</li>
      </ul>
      <h4 className="text-lg font-bold mt-3">Pagamento na Entrega</h4>
      <p className="text-sm">Dinheiro</p>
      <p className="text-sm font-bold">Pedido Mínimo: R$ 15,00</p>
      <button
        onClick={onClose}
        className="mt-3 text-sm text-red-500 hover:text-red-700"
      >
        Fechar
      </button>
    </div>
  );
};

export default HoursModal;
