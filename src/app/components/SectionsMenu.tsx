"use client";

import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import menuData from "../../data/menuData.json";
import SelectedItemModal from "./SelectedItemModal";

interface Extra {
  id: number;
  name: string;
  price: number;
}

interface MenuItemType {
  id: number;
  isDestaque?: boolean;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  extras?: Extra[];
}

interface MenuData {
  [key: string]: MenuItemType[];
}

export default function SectionsMenu() {
  const [data] = useState<MenuData>(menuData as MenuData);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const openModal = (item: MenuItemType) => setSelectedItem(item);
  const closeModal = () => {
    setSelectedItem(null);
    setQuantity(1);
    setSelectedExtras([]);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Função para monitorar o scroll e exibir o botão
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Exibir o botão após rolar 300px para baixo
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para rolar para o topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <nav className="bg-[#1C3B4A] shadow-md sticky top-0 z-49 mb-10">
        <ul className="flex sm:justify-start md:justify-center gap-4 p-4 overflow-x-auto">
          {Object.keys(data).map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className="relative text-lg font-semibold text-white hover:text-[#F80305] transition after:content-[''] after:absolute after:left-0 after:bottom-[-14px] after:w-full after:h-[2px] after:bg-transparent after:transition-all hover:after:bg-[#F80305]"
              >
                {section.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        {Object.keys(data).map((section) => (
          <section key={section} id={section} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-[#46464D]">{section.toUpperCase()}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data[section].map((item) => (
                <MenuItem
                  key={item.id} // Usando item.id em vez de itemIndex
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={`R$ ${item.price.toFixed(2).replace(".", ",")}`}
                  imageSrc={item.imageSrc}
                  onClick={() => openModal(item)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Modal de item selecionado */}
      <SelectedItemModal
        selectedItem={selectedItem}
        quantity={quantity}
        setQuantity={setQuantity} // Certifique-se de não passar funções duplicadas
        selectedExtras={selectedExtras}
        setSelectedExtras={setSelectedExtras}
        handleQuantityChange={handleQuantityChange} // Não é necessário passar duas vezes
        closeModal={closeModal}
      />

      {/* Botão para rolar para o topo */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-gray-300 rounded-full text-black shadow-lg hover:bg-[#c70202] transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7-7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
