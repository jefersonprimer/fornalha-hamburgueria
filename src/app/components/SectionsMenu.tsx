"use client";

import React, { useState } from "react";
import MenuItem from "./MenuItem";
import menuData from "../../data/menuData.json";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function SectionsMenu() {
  const [data] = useState(menuData);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const openModal = (item: any) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setQuantity(1);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      // Garantir que o price seja um número
      const price = parseFloat(selectedItem.price);
      addToCart({ ...selectedItem, id: selectedItem.id, price, quantity });
      closeModal();
      router.push("/pedidos"); // Redireciona para a página de pedidos
    }
  };

  return (
    <div>
      <div className="py-8 max-w-6xl mx-auto">
        {Object.keys(data).map((section, index) => (
          <section key={index} id={section} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{section.toUpperCase()}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data[section].map((item: any, itemIndex: number) => (
                <MenuItem
                  key={itemIndex}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageSrc={item.imageSrc}
                  onClick={() => openModal(item)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h3 className="text-2xl font-bold">{selectedItem.name}</h3>
            <h2 className="text-2xl font-bold">{selectedItem.description}</h2>
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
