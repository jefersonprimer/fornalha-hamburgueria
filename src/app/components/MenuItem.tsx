// MenuItem.tsx
import React from "react";

interface MenuItemProps {
  id: number;
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  onClick: () => void; // Função para abrir o modal
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, imageSrc, onClick }) => {
  return (
    <div onClick={onClick} className="flex items-center justify-between bg-[#FFD5A8] rounded border-[2px] border-[#E9A761] p-4  shadow-md mb-4 cursor-pointer">
      {/* Coluna com o nome, descrição e preço */}
      <div className="flex flex-col flex-grow">
        <h1 className="text-xl font-semibold text-[#46464D] uppercase">{name}</h1>
        <p className="text-[#46464D] mb-2 w-[350px] text-[16px]">{description}</p>
        <span className="text-lg font-bold w-20 px-2 rounded-[5px] bg-[#FFF] text-[#000]">{price}</span>
      </div>

      {/* Imagem do item */}
      <div className="ml-4">
        <img src={imageSrc} alt={name} className="w-[180px] h-[180px]  object-cover" />
      </div>
    </div>
  );
};

export default MenuItem;
