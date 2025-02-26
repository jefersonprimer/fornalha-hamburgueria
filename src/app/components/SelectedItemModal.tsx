import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import ExtrasDropdown from "./ExtrasDropdown";

interface Extra {
  name: string;
  price: number;
  quantity?: number;
}

interface SelectedItemModalProps {
  selectedItem: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageSrc: string;
    extras?: Extra[];
  } | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  selectedExtras: Extra[];
  setSelectedExtras: (extras: Extra[]) => void;
  handleQuantityChange: (delta: number) => void;
  closeModal: () => void;
}

export default function SelectedItemModal({
  selectedItem,
  quantity,
  setQuantity,
  selectedExtras,
  setSelectedExtras,
  handleQuantityChange,
  closeModal,
}: SelectedItemModalProps) {
  const { addToCart } = useCart(); // Obtendo a função para adicionar ao carrinho

  if (!selectedItem) return null;

  const handleAddToCart = () => {
    addToCart({
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      quantity,
      extras: selectedExtras, // Passando os extras com quantidade
    });
    closeModal(); // Fecha o modal após adicionar ao carrinho
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <h1 className="font-semibold text-[#46464D] uppercase">{selectedItem.name}</h1>
        <p className="text-[#46464D] mb-2 w-[350px] text-[16px]">{selectedItem.description}</p>
        <img src={selectedItem.imageSrc} alt={selectedItem.name} />

        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 text-2xl bg-[#E5E7EB] rounded-[50%] hover:bg-[#FFFFFF]"
        >
          <svg className="size-8" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#374151"><path d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>
        </button>

        {/* Controle de quantidade do item principal */}
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
          <button onClick={handleAddToCart} className="bg-[#1C1B1B] text-white p-2 rounded w-full">
            Adicionar aos Pedidos
          </button>
        </div>
      </div>
    </div>
  );
}
