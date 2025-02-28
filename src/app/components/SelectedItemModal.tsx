import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import ExtrasDropdown from "./ExtrasDropdown";

interface Extra {
  id: number;
  name: string;
  price: number;
  quantity?: number; // Torna a propriedade opcional
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
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  selectedExtras: Extra[];
  setSelectedExtras: (extras: Extra[]) => void;
  closeModal: () => void;
  handleQuantityChange: (delta: number) => void;
}

// Função para gerar um ID único para extras, caso necessário
const generateUniqueId = () => Math.floor(Math.random() * 1000000);

export default function SelectedItemModal({
  selectedItem,
  quantity,
  setQuantity,
  selectedExtras,
  setSelectedExtras,
  closeModal,
  handleQuantityChange,
}: SelectedItemModalProps) {
  const { addToCart } = useCart();

  if (!selectedItem) return null;

  // Garantir que os extras tenham um ID único
  const handleAddToCart = () => {
    addToCart({
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      quantity,
      extras: selectedExtras.map(extra => ({
        ...extra,
        id: extra.id || generateUniqueId(), // Garantindo que cada extra tenha um id
      })),
    });
    closeModal();
  };

  // Função para garantir que a quantidade não seja negativa
  const handleQuantityChangeWithValidation = (delta: number) => {
    if (handleQuantityChange) { // Adicionando verificação para garantir que a função existe
      handleQuantityChange(delta); // Usando a prop aqui
    }
    setQuantity((prev) => Math.max(1, prev + delta)); // Garantindo que a quantidade não fique negativa
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <h1 className="font-semibold text-[#46464D] uppercase">{selectedItem.name}</h1>
        <p className="text-[#46464D] mb-2 w-[350px] text-[16px]">{selectedItem.description}</p>

        {/* Correção do uso de <img> para <Image /> com largura e altura fixas */}
        <div className="relative w-[300px] h-[200px] mx-auto">
          <Image
            src={selectedItem.imageSrc}
            alt={selectedItem.name}
            width={300}
            height={200}
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        {/* Botão de fechar modal com acessibilidade */}
        <button
          onClick={closeModal}
          aria-label="Fechar modal"
          className="absolute top-2 right-2 text-gray-500 text-2xl bg-[#E5E7EB] rounded-full hover:bg-[#FFFFFF] p-2"
        >
          <svg className="size-6" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#374151">
            <path d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
          </svg>
        </button>

        {/* Controle de quantidade com validação */}
        <div className="flex items-center mt-4">
          <button onClick={() => handleQuantityChangeWithValidation(-1)} className="p-2 bg-gray-200 rounded-lg">
            <FaMinus />
          </button>
          <span className="mx-4">{quantity}</span>
          <button onClick={() => handleQuantityChangeWithValidation(1)} className="p-2 bg-gray-200 rounded-lg">
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

        {/* Botão para adicionar ao carrinho */}
        <div className="mt-4">
          <button onClick={handleAddToCart} className="bg-[#1C1B1B] text-white p-2 rounded w-full">
            Adicionar aos Pedidos
          </button>
        </div>
      </div>
    </div>
  );
}
