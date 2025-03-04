import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import ExtrasDropdown from "./ExtrasDropdown";
import Image from "next/image";
import { Extra } from "@/types/Extras";
import { MenuItemType } from "@/types/MenuItemType";

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
  closeModal: () => void;
  handleSelectExtra?: (extra: Extra) => void;
  handleQuantityChange: (delta: number) => void;
  handleAddToCart: () => void; // 🟢 ADICIONE ISSO
  onSave: (updatedItem: MenuItemType) => void;
  isEditing?: boolean;
}


export default function SelectedItemModal({
  selectedItem,
  quantity,
  setQuantity,
  selectedExtras,
  setSelectedExtras,
  closeModal,
  isEditing = false,
}: SelectedItemModalProps) {
  const { addToCart, updateCart } = useCart();

  if (!selectedItem) return null;

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    // Garantir que não existam extras duplicados
    const uniqueExtras = selectedExtras.reduce((acc: Extra[], current) => {
      const existingIndex = acc.findIndex(item => item.id === current.id);
      if (existingIndex === -1) {
        acc.push(current);
      }
      return acc;
    }, []);

    if (isEditing) {
      // Se estiver editando, atualiza o item no carrinho
      updateCart(selectedItem.id, quantity, uniqueExtras);
    } else {
      // Se estiver adicionando um novo item
      addToCart({
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity,
        extras: uniqueExtras,
        description: selectedItem.description,
        imageSrc: selectedItem.imageSrc,
      });
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
     <div className="bg-white rounded-none md:rounded-lg overflow-y-auto w-full max-w-4xl relative h-full md:h-auto max-h-screen">
        {/* Botão de fechar */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 text-2xl bg-[#E5E7EB] rounded-full hover:bg-[#FFFFFF]"
        >
          <svg className="size-8" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#374151">
            <path d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
          </svg>
        </button>
  
        {/* Layout flexível */}
        <div className="flex flex-col md:flex-row ">
          {/* Imagem */}
          <div className="w-full md:w-1/2 flex justify-center p-2">
            <div className="flex justify-center items-center">
              <Image 
                src={selectedItem.imageSrc} 
                alt={selectedItem.name} 
                width={384} 
                height={384} 
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Conteúdo */}
          <div className="w-full md:w-1/2 mb-20 md:mb-0 bg-[#F3F4F6] rounded-tr-lg rounded-br-lg border-[1px] border-[#E5E7EB] pt-2">
            <h1 className="bold py-2 ml-2">Detalhes do produto</h1>
            <div className=" border-[1px] bg-[#FFF] rounded-tr-lg rounded-tl-lg border-[#E5E7EB]">
              <h1 className="font-semibold text-[#46464D] uppercase p-2">{selectedItem.name}</h1>
              <p className="text-[#46464D] mb-2 text-[16px] pl-2">{selectedItem.description}</p>
              <p className="text-[#000] mb-2 text-[16px] p-2">
                R$ {selectedItem.price.toFixed(2)}
              </p>
              {/* Dropdown de extras */}
              {selectedItem.extras && (
                <ExtrasDropdown
                  extras={selectedItem.extras}
                  selectedExtras={selectedExtras}
                  setSelectedExtras={setSelectedExtras}
                  handleSelectExtra={() => {}}
                />
              )}
              {/* Controle de quantidade + botão de adicionar */}
              <div className="border-t-[2px] border-[#E5E5E5] ">
              <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#E5E5E5] p-4 flex justify-between items-center md:static md:p-2">
                  {/* Controle de quantidade */}
                  <div className="flex items-center rounded-lg bg-[#F3F4F6] p-2">
                    <button onClick={() => handleQuantityChange(-1)} className="p-2">
                      <FaMinus />
                    </button>
                    <span className="mx-4">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} className="p-2">
                      <FaPlus />
                    </button>
                  </div>
                  {/* Botão de adicionar */}
                  <button onClick={handleAddToCart} className="bg-[#1C1B1B] text-white p-2 rounded w-30">
                    {isEditing ? "Atualizar Pedido" : "Adicionar aos Pedidos"}
                  </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}