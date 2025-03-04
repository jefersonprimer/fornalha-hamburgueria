"use client";

import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import menuData from "../../data/menuData.json";
import { useCart } from "../context/CartContext";
import SelectedItemModal from "./SelectedItemModal";
import { MenuItemType } from "@/types/MenuItemType";
import { Extra } from "@/types/Extras";
import { MenuData } from "@/types/menuTypes"; // Certifique-se de importar corretamente o MenuData

export default function SectionsMenu() {
  const [data] = useState<MenuData>(menuData);  // Aqui está o tipo correto
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const { addToCart } = useCart();
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

  const handleSelectExtra = (extra: { id: number; name: string; price: number }) => {
    setSelectedExtras((prevExtras) => {
      const existingExtra = prevExtras.find((e) => e.id === extra.id);
      if (existingExtra) {
        return prevExtras.map((e) =>
          e.id === extra.id ? { ...e, quantity: e.quantity + 1 } : e
        );
      }
      return [...prevExtras, { ...extra, quantity: 1 }];
    });
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart({
        ...selectedItem,
        quantity,
        extras: selectedExtras.map((extra) => ({
          id: parseInt(extra.id as unknown as string, 10), // Converte caso necessário
          name: extra.name,
          price: extra.price,
          quantity: extra.quantity ?? 1,
        }))
        ,
      });
      closeModal();
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                  key={item.id}
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

      <SelectedItemModal
        selectedItem={selectedItem ? { ...selectedItem, extras: selectedItem.extras ?? [] } : null}
        quantity={quantity}
        setQuantity={setQuantity}
        selectedExtras={selectedExtras}
        setSelectedExtras={setSelectedExtras}
        handleQuantityChange={handleQuantityChange}
        handleAddToCart={handleAddToCart}
        closeModal={closeModal}
        handleSelectExtra={handleSelectExtra} // Passando a função
        onSave={function (): void {
          throw new Error("Function not implemented.");
        } }      />


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
