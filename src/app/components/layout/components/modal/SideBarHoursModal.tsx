// components/modal/HoursModal.tsx
import React from "react";

interface HoursModalProps {
  onClose: () => void;
}

const HoursModal: React.FC<HoursModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
   <div className=" w-90 bg-white text-black p-4 shadow-lg z-50">
    <div className="flex justify-between items-center w-full">
      <h3 className="text-lg font-bold mb-[0.5px]">
        Horários de Funcionamento
      </h3>
      <button
        onClick={onClose}
        className="text-sm text-red-500 hover:text-red-700 pl-2"
      >
       <svg className="size-6" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#000"><path d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>
      </button>
    </div>

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
     
    </div>
    </div>
  );
};

export default HoursModal;
