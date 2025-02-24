"use client";

import Link from "next/link";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa"; // Biblioteca de ícones do React

import DeliveryModal from "../modal/DeliveryModal"; // Importa o Modal de entrega
import Modal from "../modal/CuponsModal"; // Importa o Modal de cupons

import { useState } from "react";
import menuData from "../../../data/menuData.json";  // Dados do JSON com itens de menu

export default function Header() {
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");  // Estado para o valor do input
  const [filteredItems, setFilteredItems] = useState<any[]>([]);  // Itens filtrados
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);  // Controle do modal de pesquisa
  const [isHoursModalVisible, setIsHoursModalVisible] = useState(false);

  // Função para abrir o modal de entrega
  const openDeliveryModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeliveryModalOpen(true);
  };

  // Função para fechar o modal de entrega
  const closeDeliveryModal = () => {
    setIsDeliveryModalOpen(false);
  };

  // Função para abrir o modal de cupons
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  // Função para fechar o modal de cupons
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para abrir o modal de pesquisa
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  // Função para fechar o modal de pesquisa
  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  // Função para filtrar os itens com base no termo de pesquisa
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    const result = Object.values(menuData)
      .flat()
      .filter((item: any) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );

    setFilteredItems(result);

    // Abre o modal de pesquisa quando há resultados
    if (query) {
      openSearchModal();
    } else {
      closeSearchModal();  // Fecha o modal quando a pesquisa está vazia
    }
  };

  return (
    <header className="flex items-center justify-between p-2 px-6 bg-[#171312] shadow-md">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={180} height={100} />
      </Link>

      {/* Barra de Pesquisa */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-8 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F80305] text-black"
        />
        <svg
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-labelledby="search-svg"
          aria-hidden="false"
          role="img"
        >
          <title id="search-svg">Buscar</title>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5 19C12.4879 19 14.3164 18.3176 15.7641 17.1742L21.2927 22.7069L22.7074 21.2931L17.1778 15.7595C18.319 14.3126 19 12.4858 19 10.5C19 5.80558 15.1944 2 10.5 2C5.80558 2 2 5.80558 2 10.5C2 15.1944 5.80558 19 10.5 19ZM10.5 17C14.0899 17 17 14.0899 17 10.5C17 6.91015 14.0899 4 10.5 4C6.91015 4 4 6.91015 4 10.5C4 14.0899 6.91015 17 10.5 17Z"
          />
        </svg>
      </div>

      {/* Links de Navegação */}
      <nav className="flex gap-4">
        <Link href="/" className="relative text-white hover:text-[#F80305] transition 
                          after:content-[''] after:absolute after:left-0 after:bottom-[-22px] 
                          after:w-full after:h-[2px] after:bg-transparent after:transition-all 
                          hover:after:bg-[#F80305]">Cardápio</Link>
        <Link href="/pedidos" className="relative  text-white hover:text-[#F80305] transition 
                          after:content-[''] after:absolute after:left-0 after:bottom-[-22px]
                          after:w-full after:h-[2px] after:bg-transparent after:transition-all 
                          hover:after:bg-[#F80305]">Pedidos</Link>
        <a href="#" onClick={openModal} className="relative text-white hover:text-[#F80305] transition 
                          after:content-[''] after:absolute after:left-0 after:bottom-[-22px]
                          after:w-full after:h-[2px] after:bg-transparent after:transition-all 
                          hover:after:bg-[#F80305]">Cupons</a>
        <a href="#" onMouseEnter={() => setIsHoursModalVisible(true)} onMouseLeave={() => setIsHoursModalVisible(false)}className="relative text-white hover:text-[#F80305] transition 
                          after:content-[''] after:absolute after:left-0 after:bottom-[-22px]
                          after:w-full after:h-[2px] after:bg-transparent after:transition-all 
                          hover:after:bg-[#F80305]">Horários</a>
      </nav>

        {/* Modal exibido ao passar o mouse */}
        {isHoursModalVisible && (
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
            </div>
          )}

      <nav className="flex gap-4">
        <button
          id="header-menu"
          className="mdl-button mdl-js-button header-button header-signin js-header-signin border-r-10 flex items-center"
        >
          <Link href="/login">
          <span className="text-white hover:text-[#F80305]">Entre ou Cadastre-se</span>
          </Link>
          <svg
            className="header-svg-icon w-5 h-5 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-labelledby="user-settings-svg"
            aria-hidden="true"
            role="img"
            fill="white"
          >
            <title id="user-settings-svg">Menu da conta</title>
            <path d="M12 20a6.01 6.01 0 0 1-5.966-5.355L12 12.088l5.966 2.557A6.01 6.01 0 0 1 12 20m0-16c1.654 0 3 1.346 3 3s-1.345 3-2.999 3h-.002A3.003 3.003 0 0 1 9 7c0-1.654 1.346-3 3-3m7.394 9.081l-4.572-1.959A4.997 4.997 0 0 0 17 7c0-2.757-2.243-5-5-5S7 4.243 7 7c0 1.71.865 3.22 2.178 4.122l-4.572 1.959A.999.999 0 0 0 4 14c0 4.411 3.589 8 8 8s8-3.589 8-8c0-.4-.238-.762-.606-.919"></path>
          </svg>
        </button>
      </nav>

      {/* Modal de Cupons */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* Modal de Pesquisa */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-[600px] h-[80%] max-h-[800px]">
            <h2 className="text-xl font-bold mb-4">Resultados da Pesquisa</h2>
            <div className="h-[80%] max-h-[800px] overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div key={index} className="mb-4 p-4 border-b flex items-center">
                    {/* Imagem do item */}
                    <div className="w-1/4 mr-4">
                      <Image
                        src={item.imageSrc} // Aqui, você deve garantir que 'item.imageUrl' é a URL da imagem
                        alt={item.name}
                        width={80} // Ajuste o tamanho conforme necessário
                        height={80} // Ajuste o tamanho conforme necessário
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Informações do item */}
                    <div className="w-3/4">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-gray-500">{item.description}</p>
                      <p className="font-bold text-lg">{`R$ ${item.price}`}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Nenhum item encontrado.</p>
              )}
            </div>
            <button
              onClick={closeSearchModal}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
