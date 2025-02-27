"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const CityModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
  <div className="bg-white p-6 rounded-md w-[500px] max-w-[90%]" style={{ zIndex: 9999 }}>
    
    {/* Container flex para alinhar o título e o botão de fechar */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">Fornalha Hamburgueria</h3>
      
      {/* Botão de Fechar no canto direito */}
      <button onClick={onClose}
       className=" text-gray-500 text-2xl bg-[#E5E7EB] rounded-[50%] hover:bg-[#FFFFFF]">
       <svg className="size-8" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#374151"><path d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>
      </button>
    </div>

    {/* Layout responsivo - Imagem acima no mobile, ao lado no desktop */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
      <img
        src="https://files.menudino.com/cardapios/63227/logo.png"
        alt="Logo"
        className="w-[120px] h-[120px] rounded-md"
      />

      <div className="text-sm text-black">
        <p>
          O melhor hambúrguer artesanal da região, oferecemos uma experiência única, utilizando os melhores 
          ingredientes para garantir um produto final da mais alta qualidade 🍔❤🍟
        </p>
        <p className="mt-4">
          <strong>Instagram:</strong> <a href="https://www.instagram.com/hamburgueria_fornalha_fw/" className="text-blue-500">
          @hamburgueria_fornalha_fw</a>
        </p>
      </div>
    </div>

    {/* Informações de Contato e Endereço */}
    <div className="text-sm text-black mt-4 text-center sm:text-left">
      <div>
        <strong>Contato:</strong><br />
        <div className="flex flex-wrap">
        <a href="https://web.whatsapp.com/send?phone=55996869185"
        target="_blank" rel="noopener noreferrer nofollow" 
        className="flex items-center mt-3 mr-3 p-2.5 space-x-2.5 border-[2px] border-[#1C1B1B] rounded-md button-outlined-primary hover:text-white hover:bg-[#1C1B1B]">
        <svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 24 24" width="512" 
        className="w-5 h-5 fill-current"><path d="M17.507 14.307l-.009.075c-2.199-1.096-2.429-1.242-2.713-.816-.197.295-.771.964-.944 1.162s-.349.21-.646.075c-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524s-.672-1.62-.922-2.206c-.24-.584-.487-.51-.672-.51-.576-.05-.997-.042-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.804 5.114.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425s-.27-.21-.57-.345zM20.52 3.449C12.831-3.984.106 1.407.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c7.905 4.27 17.661-1.4 17.665-10.449 0-3.176-1.24-6.165-3.495-8.411zm1.482 8.417c-.006 7.633-8.385 12.4-15.012 8.504l-.36-.214-3.75.975 1.005-3.645-.239-.375c-4.124-6.565.614-15.145 8.426-15.145 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99z"></path></svg>
        <span className="text-sm whitespace-nowrap  h:bg-[#374151]">(55) 99686-9185</span></a>
        
        <a href="tel:(55) 37441604" rel="nofollow" 
        className="flex items-center mt-3 p-2.5 space-x-2.5 border-[2px] border-[#1C1B1B] rounded-md button-outlined-primary hover:text-white hover:bg-[#1C1B1B]">
        <svg className="w-5 h-5 fill-current" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"></path></svg>
        <span className="text-sm whitespace-nowrap">(55) 3744-1604</span></a></div>
      </div>
      <div className="mt-4">
        <strong>Endereço:</strong><br />
        Rua do Comércio 441 Centro, <br />
        Frederico Westphalen 98400000 - RS
      </div>
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
      setStoreStatus("Aberto até às 23h00");
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
          className="w-[160px] h-[160px] rounded-md z-20"
        />
        <div>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl cursor-pointer text-[#1F2937]">
          FORNALHA HAMBURGUERIA E PETISCARIA
        </h1>

          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-2">
            <span
              className={`font-semibold order-last sm:order-none ${
                storeStatus.includes("Aberto") ? "text-green-500" : "text-red-500"
              }`}
            >
              {storeStatus}
            </span>
            <div className="w-1.5 h-1.5 bg-gray-700 rounded-full hidden sm:block"></div>
            <div className="flex gap-2 justify-center items-center sm:flex-row">
              <Link href="https://www.google.com/maps/place/Fornalha+Hamburgueria+e+petiscaria/@-27.3555844,-53.3950572,206m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94fb9f7bb19630c5:0x3eb8cc233a9fb50e!8m2!3d-27.3555844!4d-53.3950572!16s%2Fg%2F11thpzv9_w?entry=ttu&g_ep=EgoyMDI1MDIyNC4wIKXMDSoASAFQAw%3D%3D">
                <svg className="size-6 cursor-pointer" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="4b5563">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11.4.48 1.13.48 1.53 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                </svg>
              </Link>
              <button onClick={openModal} className="text-lg">
                Frederico Westphalen
              </button>
              <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
              <button onClick={openModal} className="text-lg font-semibold">
                Mais informações
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <CityModal onClose={closeModal} />}
    </div>
  );
};

export default HeaderWithStatus;
