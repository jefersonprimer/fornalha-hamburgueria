"use client";

import React, { useState, useEffect } from "react";

const CityModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-[500px] max-w-[90%]" style={{ zIndex: 9999 }}>
        <h3 className="text-xl font-bold text-center mb-4">Distrito Burger</h3>

        {/* Layout responsivo - Imagem acima no mobile, ao lado no desktop */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
          <img
            src="https://files.menudino.com/cardapios/63227/logo.png"
            alt="Logo"
            className="w-[120px] h-[120px] rounded-md"
          />

          <div className="text-sm text-black">
            <p>
              O melhor hambúrguer artesanal da região, oferecemos uma experiência única, utilizando os melhores ingredientes para garantir um produto final da mais alta qualidade 🍔❤🍟
            </p>
            <p className="mt-4">
              <strong>Instagram:</strong> <a href="https://www.instagram.com/distritoburger_" className="text-blue-500">@distritoburger_</a>
            </p>
          </div>
        </div>

        {/* Informações de Contato e Endereço */}
        <div className="text-sm text-black mt-4 text-center sm:text-left">
          <div>
            <strong>Contato:</strong><br />
            (19) 99221-6680<br />
            (19) 99221-6680
          </div>
          <div className="mt-4">
            <strong>Endereço:</strong><br />
            Av. Ruy Rodriguez, 4267<br />
            Parque Universitário de Viracopos, Campinas - SP
          </div>
        </div>

        {/* Botão de Fechar */}
        <div className="mt-4 flex justify-center">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const HeaderWithStatus: React.FC = () => {
  const [storeStatus, setStoreStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 && currentHour < 22) {
      setStoreStatus("Aberto até às 22h00");
    } else {
      setStoreStatus("Fechado - Abrimos às 18h");
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-between items-center p-4 bg-[#FFF] text-black">
      <div className="flex flex-col sm:flex-row items-center sm:items-end text-center sm:text-left gap-4">
        <img
          src="https://files.menudino.com/cardapios/63227/logo.png"
          alt="Logo"
          className="w-[160px] h-[160px] rounded-md"
        />
        <div>
          <h1 className="font-bold text-lg">FORNALHA HAMBURGUERIA E PETISCARIA</h1>
          <p className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-2">
            <span
              className={`font-semibold ${
                storeStatus.includes("Aberto") ? "text-green-500" : "text-red-500"
              }`}
            >
              {storeStatus}
            </span>
            <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
            <svg className="size-8" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="4b5563">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11.4.48 1.13.48 1.53 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
            </svg>
            <button onClick={openModal} className="text-lg">
              Frederico Westphalen
            </button>
            <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
            <button onClick={openModal} className="text-lg">
              Mais informações
            </button>
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <CityModal onClose={closeModal} />}
    </div>
  );
};

export default HeaderWithStatus;
