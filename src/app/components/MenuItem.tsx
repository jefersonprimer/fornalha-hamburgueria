import React, { useState, useEffect } from "react";
import SkeletonLoader from './SkeletonLoader';  // Importe o SkeletonLoader

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
    // Simula um delay de carregamento de dados (como uma requisição para a API)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 250); // Simula 2 segundos de delay

    return () => clearTimeout(timer); // Limpeza do timer
  }, []);

  if (loading) {
    return <SkeletonLoader />;  // Exibe o Skeleton Loader enquanto carrega
  }

  return (
    <div onClick={onClick} className="flex items-center justify-between bg-[#FFFFFF] rounded border-[2px] border-[#E0E0E0] p-4 shadow-md cursor-pointer hover:border-gray-300">
      {/* Coluna com o nome, descrição e preço */}
      <div className="flex flex-col flex-grow">
        <h1 className="font-semibold text-[#46464D] uppercase">{name}</h1>
        <p className="text-[#46464D] mb-2 w-[350px] text-[16px]">{description}</p>
        <span className="text-lg font-bold w-30 rounded-[5px] bg-[#FFF] text-[#000]">{price}</span>
      </div>

      {/* Imagem do item */}
      <div className="ml-4">
        <img src={imageSrc} alt={name} className="w-[180px] h-[180px] object-cover rounded-[5px]" />
      </div>
    </div>
  );
};

export default MenuItem;
