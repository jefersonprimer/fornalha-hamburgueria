// MenuItem.tsx
import React from "react";

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  onClick: () => void; // Função para abrir o modal
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, imageSrc, onClick }) => {
  return (
    <div onClick={onClick} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer">
      {/* Coluna com o nome, descrição e preço */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <span className="text-lg font-bold text-green-500">{price}</span>
      </div>

      {/* Imagem do item */}
      <div className="ml-4">
        <img src={imageSrc} alt={name} className="w-24 h-24 object-cover rounded-md" />
      </div>
    </div>
  );
};

export default MenuItem;
