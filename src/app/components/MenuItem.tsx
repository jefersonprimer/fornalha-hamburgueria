import React, { useState, useEffect } from "react";
import SkeletonLoader from "./SkeletonLoader"; // Importe o SkeletonLoader
import Image from "next/image";


interface MenuItemProps {
  id: number;
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  onClick: () => void; // Função para abrir o modal
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, imageSrc, onClick }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula um delay de carregamento de dados (250ms)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer); // Limpeza do timer
  }, []);

  if (loading) {
    return <SkeletonLoader />; // Exibe o Skeleton Loader enquanto carrega
  }

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between bg-[#FFFFFF] rounded border-[2px] border-[#E0E0E0] p-4 shadow-md cursor-pointer hover:border-gray-300"
    >
      {/* Coluna com o nome, descrição e preço */}
      <div className="flex flex-col flex-grow">
        <h1 className="font-semibold text-[#46464D] uppercase">{name}</h1>
        <p className="text-[#46464D] mb-2 w-[250px] sm:w-[350px] text-[14px] sm:text-[16px] line-clamp-3">
          {description}
        </p>
        <span className="text-lg font-bold w-30 rounded-[5px] bg-[#FFF] text-[#000]">{price}</span>
      </div>

      {/* Imagem do item */}
      <div className="ml-4">
        <Image
          src={imageSrc}
          alt={name}
          width={140}
          height={140}
          className="sm:w-[150px] sm:h-[150px] md:w-[180px] object-cover rounded-[5px]"
        />
      </div>
    </div>
  );
};

export default MenuItem;
