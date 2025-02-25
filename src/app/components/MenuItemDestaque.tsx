import React from "react";

interface MenuItemDestaqueProps {
  id: number;
  isDestaque?: boolean;
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  onClick?: () => void; // Função para abrir o modal
}

const MenuItemDestaque: React.FC<MenuItemDestaqueProps> = ({
  name,
  description,
  price,
  imageSrc,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col w-[270px] h-[400px] items-center justify-between bg-[#FFD5A8] rounded border-[2px] border-[#E9A761] pt-2 pb-4 shadow-md mb-4 cursor-pointer"
    >
      {/* Imagem com tamanho fixo */}
      <img
        src={imageSrc}
        alt={name}
        className="w-[250px] h-[250px] object-cover mb-4"
      />

      {/* Coluna com o nome, descrição e preço */}
      <div className="flex flex-col items-center text-center h-[150px] justify-between">
        <h2 className="font-semibold w-[250px] text-[#46464D] text-[16px] uppercase">{name}</h2>

        {/* Descrição visível apenas em telas médias e grandes */}
        <p className="text-[#46464D] mb-2 w-[250px] text-[14px] sm:block hidden">
          {description}
        </p>

        <span className="text-lg font-bold w-[250px] px-2 rounded-[5px] bg-[#FFF] text-[#000] mx-auto sm:mx-0">
          {price}
        </span>
      </div>
    </div>
  );
};

export default MenuItemDestaque;
