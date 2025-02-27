"use client";

import Link from "next/link";
import { useState } from "react";
import HoursModal from "./modal/SideBarHoursModal"; // Importando o modal de Horários
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  openModal: (e: React.MouseEvent) => void; // Função que abre os outros modais
}

export default function Sidebar({ isOpen, onClose, openModal }: SidebarProps) {
  // Estado para controlar a visibilidade do modal de Horários
  const [isHorarioModalOpen, setIsHorarioModalOpen] = useState(false);

  // Função para abrir o modal de Horários
  const openHorarioModal = () => {
    setIsHorarioModalOpen(true);
    onClose(); // Fecha a Sidebar ao abrir o modal de Horários
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsHorarioModalOpen(false);
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#171312] p-6 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform sm:hidden z-50`}
      >
        <button onClick={onClose} className="text-white mb-4">
        <svg className="size-8" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#FFF"><path d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>
        </button>
        <nav className="flex flex-col gap-4 mt-12">
          {/* Links com ícones alinhados horizontalmente */}
          <Link href="/" className="text-white hover:text-[#F80305] text-left flex items-center gap-2 text-xl" onClick={onClose}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white">
              <path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/>
            </svg>
            Cardápio
          </Link>

          <Link href="/pedidos" className="text-white hover:text-[#F80305] text-left flex items-center gap-2 text-xl" onClick={onClose}>
          <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white"><path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z"/></svg>
            Pedidos
          </Link>
          <a href="#" onClick={(e) => { openModal(e); onClose(); }} className="text-white hover:text-[#F80305] text-left flex items-center gap-2 text-xl">
          <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white"><path d="M64 64C28.7 64 0 92.7 0 128l0 64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320l0 64c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-64c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-64c0-35.3-28.7-64-64-64L64 64zm64 112l0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16l0-160c0-8.8-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-320 0c-17.7 0-32-14.3-32-32l0-192z"/></svg>
            Cupons
          </a>
          <a href="/fidelidade/campanhas" className="text-white hover:text-[#F80305] text-left flex items-center gap-2 text-xl">
          <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white"><path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.4-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z"/></svg>
            Fidelidade
          </a>
          <a href="#" className="text-white hover:text-[#F80305] text-left flex items-center gap-2 text-xl" onClick={openHorarioModal}>
            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>  
            Horários
          </a>
        </nav>

        <Link href="/">
          <img src="/logo-removebg-preview.png" alt="logo" className="w-40 mx-auto md:mx-0 mt-12" />
        </Link>
      </aside>

      {/* Modal de Horários */}
      {isHorarioModalOpen && <HoursModal onClose={closeModal} />}
    </>
  );
}
