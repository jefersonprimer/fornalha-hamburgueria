
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Fornalha Hamburgueria. Todos os direitos reservados. <span>CNPJ: 44.955.914/0001-81</span> </p>
        <p>Razão Social: FORNALHA HAMBURGUERIA E PETISCARIA</p>
      </div>
    </footer>
  );
};

export default Footer;
