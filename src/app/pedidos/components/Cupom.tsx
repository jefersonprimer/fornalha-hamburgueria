{/* <Cupom aplicarCupom={handleAplicarCupom} /> */}

import React, { useState } from "react";

interface CupomProps {
  aplicarCupom: (cupom: string) => void;
}

const Cupom: React.FC<CupomProps> = ({ aplicarCupom }) => {
  const [cupom, setCupom] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const handleAplicarCupom = () => {
    aplicarCupom(cupom);
    setModalAberto(false);
  };

  return (
    <>
      {/* Botão para abrir o modal */}
      <div
        className="cursor-pointer hover:bg-gray-50 p-4 border rounded-lg flex items-center justify-between"
        onClick={() => setModalAberto(true)}
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <svg
              height="24"
              viewBox="0 0 475.293 475.293"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400 fill-current"
            >
              <path d="M430.734 415.882H44.559C19.988 415.882 0 395.894 0 371.323v-74.265c0-8.21 6.643-14.853 14.853-14.853 24.571 0 44.559-19.988 44.559-44.559s-19.988-44.559-44.559-44.559c-8.21.001-14.853-6.642-14.853-14.852v-74.265c0-24.571 19.988-44.559 44.559-44.559h386.176c24.571 0 44.559 19.988 44.559 44.559v74.265c0 8.21-6.643 14.853-14.853 14.853-24.571 0-44.559 19.988-44.559 44.559s19.988 44.559 44.559 44.559c8.21 0 14.853 6.643 14.853 14.853v74.265c-.001 24.57-19.988 44.558-44.56 44.558z"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-700 text-sm">
              Tem um cupom?
            </span>
            <span className="font-light text-gray-500 text-sm">
              Clique para inserir o código
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Insira seu cupom</h2>
            <input
              type="text"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Código do cupom"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleAplicarCupom}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cupom;
