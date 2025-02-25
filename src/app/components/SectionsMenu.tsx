"use client";

import React, { useState } from "react";
import MenuItem from "./MenuItem";
import menuData from "../../data/menuData.json";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import ExtrasDropdown from "./ExtrasDropdown"; // Importando o componente ExtrasDropdown

interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  extras?: { name: string; price: number }[];
}

interface MenuData {
  [key: string]: MenuItemType[];
}

export default function SectionsMenu() {
  const [data] = useState<MenuData>(menuData);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]); // Estado para os extras
  const { addToCart } = useCart();

  const openModal = (item: MenuItemType) => setSelectedItem(item);
  const closeModal = () => {
    setSelectedItem(null);
    setQuantity(1);
    setSelectedExtras([]); // Resetar os extras ao fechar o modal
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart({
        ...selectedItem,
        quantity,
        extras: selectedExtras, // Passando os extras selecionados para o carrinho
      });
      closeModal();
    }
  };
  

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      {/* Menu horizontal fixo no topo das seções */}
      <nav className="bg-[#1C3B4A] shadow-md sticky top-0">
        <ul className="flex justify-center gap-4 p-4 overflow-x-auto">
          {Object.keys(data).map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className="relative text-lg font-semibold text-white hover:text-[#F80305] transition 
                          after:content-[''] after:absolute after:left-0 after:bottom-[-14px] 
                          after:w-full after:h-[2px] after:bg-transparent after:transition-all 
                          hover:after:bg-[#F80305]">
                {section.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Seções do Cardápio */}
      <div className="max-w-6xl mx-auto">
        {Object.keys(data).map((section) => (
          <section key={section} id={section} className="mb-12 pt-20">
            <h2 className="text-2xl font-bold mb-4 text-[#46464D]">{section.toUpperCase()}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data[section].map((item, itemIndex) => (
                <MenuItem
                  key={itemIndex}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={`R$ ${item.price}`}
                  imageSrc={item.imageSrc}
                  onClick={() => openModal(item)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Modal de item selecionado */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h3 className="text-2xl text-[#46464D] font-bold">{selectedItem.name}</h3>
            <h2 className="text-[#46464D] font-bold">{selectedItem.description}</h2>
            <img src={selectedItem.imageSrc} alt={selectedItem.name} />
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 text-2xl">
              &times;
            </button>
            <div className="flex items-center mt-4">
              <button onClick={() => handleQuantityChange(-1)} className="p-2 bg-gray-200 rounded-lg">
                <FaMinus />
              </button>
              <span className="mx-4">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="p-2 bg-gray-200 rounded-lg">
                <FaPlus />
              </button>
            </div>

            {/* Dropdown de extras */}
            {selectedItem.extras && (
              <ExtrasDropdown
                extras={selectedItem.extras}
                selectedExtras={selectedExtras}
                setSelectedExtras={setSelectedExtras}
              />
            )}

            <div className="mt-4">
              <button onClick={handleAddToCart} className="bg-blue-500 text-white p-2 rounded-lg w-full">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
