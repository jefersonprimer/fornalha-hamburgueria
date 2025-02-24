import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Usando grid para dividir as colunas igualmente */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <Link href="/">
              <img src="/logo-removebg-preview.png" alt="logo" className="w-40 mx-auto md:mx-0" />
            </Link>
          </div>

          {/* Menu institucional */}
          <div>
            <h3 className="font-semibold text-center md:text-left">Institucional</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><a href="/inicio" className="hover:text-gray-400">Início</a></li>
              <li><a href="/quem-somos" className="hover:text-gray-400">Quem Somos</a></li>
              <li><a href="/cupons" className="hover:text-gray-400">Cupons</a></li>
              <li><a href="/cardapio" className="hover:text-gray-400">Cardápio</a></li>
              <li><a href="/unidades" className="hover:text-gray-400">Unidades</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-center md:text-left">Contato</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><a href="/contato" className="hover:text-gray-400">Entre em Contato</a></li>
              <li><span className="block">Centro</span></li>
              <li><span className="block">Frederico Westphalen</span></li>
              <li><span className="block">Frederico Westphalen - Rs</span></li>
              <li><span className="block">(17) 99271-9357</span></li>
              <li><span className="block">contato@fornalha.com.br</span></li>
            </ul>
          </div>

          {/* Redes sociais */}
          <div>
            <h3 className="font-semibold text-center justify-center text-align-center md:text-left">Redes Sociais</h3>
            <div className="flex  space-x-6 mt-2 mb-2">
              <a href="https://facebook.com" className="text-white hover:text-gray-400">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-gray-400">
                <FaInstagram size={24} />
              </a>
            </div>
            <p className="text-center md:text-left">#FORNALHA</p>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="text-center mt-6">
          <p>&copy; {new Date().getFullYear()} Fornalha Hamburgueria. Todos os direitos reservados. <span>CNPJ: 44.955.914/0001-81</span></p>
          <p>Razão Social: FORNALHA HAMBURGUERIA E PETISCARIA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
