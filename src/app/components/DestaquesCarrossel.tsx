import React, { useState, useEffect } from "react";
import MenuItemDestaque from "./MenuItemDestaque"; // Usando o componente correto

interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  extras?: { name: string; price: number }[];
}

interface DestaqueType extends MenuItemType {
  isDestaque: boolean;
}

interface DestaquesCarrosselProps {
  destaques: DestaqueType[];
  openModal?: (item: MenuItemType) => void; // Adicionando a função openModal à interface
}

export default function DestaquesCarrossel({ destaques, openModal }: DestaquesCarrosselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // Ajuste conforme o seu design

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage < destaques.length ? prevIndex + itemsPerPage : 0
    );
  };

  // Hook para fazer a navegação automática
  useEffect(() => {
    const interval = setInterval(nextSlide, 10000); // Troca de slide a cada 10 segundos
    return () => clearInterval(interval);
  }, [destaques.length]);

  return (
    <div className="relative max-w-7xl mx-auto overflow-x-auto mt-16">
      <h2 className="text-3xl font-bold text-center mb-6">Destaques</h2>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`, // Ajusta a largura com base nos itens visíveis
            width: `${(destaques.length / itemsPerPage) * 100}%`, // Calcula a largura total do carrossel
          }}
        >
          {destaques.map((item) => (
            <div
              key={item.id}
              className="w-[300px] h-[450px] px-4 flex-shrink-0 cursor-pointer" // Adicionando cursor pointer para indicar que é clicável
              onClick={() => openModal(item)} // Chamando openModal ao clicar no item
            >
              <MenuItemDestaque
                id={item.id}
                name={item.name}
                description={item.description}
                price={`R$ ${item.price.toFixed(2)}`}
                imageSrc={item.imageSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
