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
    <div onClick={onClick} className="flex items-center justify-between bg-[#050505] border-dotted border-b-[5px] border-b-[#FFF] p-4  shadow-md mb-4 cursor-pointer">
      {/* Coluna com o nome, descrição e preço */}
      <div className="flex flex-col flex-grow">
        <h1 className="text-xl font-semibold text-[#FFF] uppercase">{name}</h1>
        <p className="text-gray-400 mb-2">{description}</p>
        <span className="text-lg font-bold w-20 px-2 rounded-[5px] bg-[#FFF] text-[#000]">{price}</span>
      </div>

      {/* Imagem do item */}
      <div className="ml-4">
        <img src={imageSrc} alt={name} className="w-34 h-34 object-cover" />
      </div>
    </div>
  );
};

export default MenuItem;
