"use client";

import Link from "next/link";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa"; // Biblioteca de ícones do React

export default function Header() {
  return (
    <header className="flex items-center justify-between p-2 px-6 bg-[#EE3E3E] shadow-md">
      {/* Logo */}
      <Image src="/logo.png" alt="Logo" width={180} height={100} />

      {/* Opções de Entrega */}
      <div className="flex flex-col text-white">
        <span className="navbar-opcao-entrega abrir-modal-opcao-entrega" data-load="/home/_topnavbarentrega">
          <label className="label label-white text-white flex items-center gap-1">
            Opções de entrega <FaChevronDown />
          </label>
          <small className="text-white">Insira um endereço aqui...</small>
        </span>
      </div>

      {/* Barra de Pesquisa */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar..."
          className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
      </div>

      {/* Links de Navegação */}
      <nav className="flex gap-4">
        <Link href="/cardapio" className="text-white hover:text-blue-500">Cardápio</Link>
        <Link href="/pedidos" className="text-white hover:text-blue-500">Pedidos</Link>
        <Link href="/cupons" className="text-white hover:text-blue-500">Cupons</Link>
      </nav>
    </header>
  );
}
