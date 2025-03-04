import React from "react";
import { Extra } from "@/types/Extras";
import { FaPlus, FaMinus } from "react-icons/fa";

interface ExtrasDropdownProps {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: (extras: Extra[]) => void;
  handleSelectExtra: (extra: Extra) => void;
}

export default function ExtrasDropdown({
  extras,
  selectedExtras,
  setSelectedExtras,
}: ExtrasDropdownProps) {
  // Função para adicionar um extra com uma id única
  const handleAddExtra = (extra: Extra) => {
    // Verifica se o extra já existe nos selectedExtras
    const existingExtraIndex = selectedExtras.findIndex((item) => item.id === extra.id);
    
    if (existingExtraIndex !== -1) {
      // Se já existe, apenas incrementa a quantidade
      const updatedExtras = [...selectedExtras];
      updatedExtras[existingExtraIndex] = {
        ...updatedExtras[existingExtraIndex],
        quantity: (updatedExtras[existingExtraIndex].quantity || 1) + 1,
      };
      setSelectedExtras(updatedExtras);
    } else {
      // Se não existe, adiciona o novo extra
      setSelectedExtras([...selectedExtras, { ...extra, quantity: 1 }]);
    }
  };

  // Função para remover ou reduzir a quantidade de um extra
  const handleRemoveExtra = (extraId: number) => {
    const existingExtraIndex = selectedExtras.findIndex((item) => item.id === extraId);
    
    if (existingExtraIndex === -1) return;
    
    const updatedExtras = [...selectedExtras];
    const currentQuantity = updatedExtras[existingExtraIndex].quantity || 1;
    
    if (currentQuantity > 1) {
      // Reduz a quantidade se for maior que 1
      updatedExtras[existingExtraIndex] = {
        ...updatedExtras[existingExtraIndex],
        quantity: currentQuantity - 1,
      };
    } else {
      // Remove o extra se a quantidade for 1
      updatedExtras.splice(existingExtraIndex, 1);
    }
    
    setSelectedExtras(updatedExtras);
  };

  // Função para obter a quantidade de um extra específico
  const getExtraQuantity = (extraId: number) => {
    const existing = selectedExtras.find((item) => item.id === extraId);
    return existing ? existing.quantity || 1 : 0;
  };

  return (
    <div className="mt-4">
      <h3 className="font-medium text-gray-700 bg-[#F3F4F6] p-4 border-[1px] border-[#E5E7EB]">ESCOLHA O ACOMPANHAMENTO</h3>
      
      <div className="overflow-y-auto md:max-h-40">
        {extras.map((extra) => {
          const quantity = getExtraQuantity(extra.id);
          
          return (
            <div key={extra.id} className="flex justify-between items-center p-4 border-[1px] border-[#E5E7EB] hover:bg-[#F3F4F6]">
              <div>
                <span>{extra.name}</span>
                <span className="text-sm text-gray-500 ml-2">R$ {extra.price.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveExtra(extra.id)}
                  className={`p-1 ${quantity > 0 ? 'text-red-500' : 'text-gray-300'}`}
                  disabled={quantity === 0}
                >
                  <FaMinus size={12} />
                </button>
                
                <span className="mx-2">{quantity}</span>
                
                <button
                  onClick={() => handleAddExtra(extra)}
                  className="p-1 text-green-500"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}