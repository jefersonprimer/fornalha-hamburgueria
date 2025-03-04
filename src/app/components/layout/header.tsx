"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "../modal/CuponsModal";
import SearchModal from "./components/modal/SearchModal";
import HoursModal from "./components/modal/HoursModal";
import Sidebar from "./components/Sidebar";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isHoursModalVisible, setIsHoursModalVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    setIsSidebarOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <header className="relative flex items-center justify-between p-2 px-6 bg-[#171312] shadow-md">
      {/* Menu Hamburguer */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white sm:hidden">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Logo */}
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={180} height={100} />
      </Link>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} openModal={openModal} />
      
      {/* Barra de Pesquisa */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar..."
          onFocus={openSearchModal} // Abre o modal ao clicar no input
          className="pl-8 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F80305] text-black
          hidden sm:w-32 md:w-48 lg:w-64 xl:w-80 sm:block"
        />

        <svg
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white sm:text-black sm:block cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-labelledby="search-svg"
          aria-hidden="false"
          role="img"
          onClick={openSearchModal}
        >
          <title id="search-svg">Buscar</title>
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5 19C12.4879 19 14.3164 18.3176 15.7641 17.1742L21.2927 22.7069L22.7074 21.2931L17.1778 15.7595C18.319 14.3126 19 12.4858 19 10.5C19 5.80558 15.1944 2 10.5 2C5.80558 2 2 5.80558 2 10.5C2 15.1944 5.80558 19 10.5 19ZM10.5 17C14.0899 17 17 14.0899 17 10.5C17 6.91015 14.0899 4 10.5 4C6.91015 4 4 6.91015 4 10.5C4 14.0899 6.91015 17 10.5 17Z"
          />
        </svg>
      </div>

      {/* Links de Navegação */}
      <nav className="hidden sm:flex gap-4">
        <Link href="/" className="text-white hover:text-[#F80305]">Cardápio</Link>
        <Link href="/pedidos" className="text-white hover:text-[#F80305]">Pedidos</Link>
        <a href="#" onClick={openModal} className="text-white hover:text-[#F80305]">Cupons</a>
        <a href="#" onMouseEnter={() => setIsHoursModalVisible(true)} onMouseLeave={() => setIsHoursModalVisible(false)} className="text-white hover:text-[#F80305]">Horários</a>
      </nav>

      {/* Modal de Horários */}
      {isHoursModalVisible && <HoursModal onClose={() => setIsHoursModalVisible(false)} />}

      {/* Botão de Login */}
      <nav className="flex gap-4">
        <Link href="/login">
          <button
            id="header-menu"
            className="mdl-button mdl-js-button header-button header-signin js-header-signin border-r-10 flex items-center"
          >
            <span className="text-white hover:text-[#F80305] lg:block hidden">
              Entre ou Cadastre-se
            </span>
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
        </Link>
      </nav>

      {/* Modal de Cupons */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      {/* Modal de Pesquisa */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
      />
    </header>
  );
}
