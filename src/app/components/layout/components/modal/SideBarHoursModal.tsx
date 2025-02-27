// components/modal/HoursModal.tsx
import React from "react";

interface HoursModalProps {
  onClose: () => void;
}

const HoursModal: React.FC<HoursModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-2xl font-semibold mb-4">Horários de Funcionamento</h2>
        <p>Segunda a Sexta: 10h - 22h</p>
        <p>Sábado: 12h - 22h</p>
        <p>Domingo: Fechado</p>
        <button
          onClick={onClose}
          className="mt-4 bg-[#F80305] text-white py-2 px-4 rounded-md hover:bg-[#F80305] transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default HoursModal;
