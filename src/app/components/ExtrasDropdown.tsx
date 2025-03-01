import React, { useState } from "react";
import { FaChevronDown, FaMinus, FaPlus } from "react-icons/fa";
import { Extra } from "@/types/Extras";

interface ExtrasDropdownProps {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: (extras: Extra[]) => void;
  handleSelectExtra: (extra: Extra) => void; // Adicionando handleSelectExtra na interface
}

export default function ExtrasDropdown({
  extras,
  selectedExtras,
  setSelectedExtras,
  handleSelectExtra, // Recebendo a função como prop
}: ExtrasDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Função para atualizar a quantidade de extras
  const handleExtraQuantityChange = (extra: Extra, delta: number) => {
    const existingExtra = selectedExtras.find((e) => e.name === extra.name);

    if (existingExtra) {
      const updatedExtras = selectedExtras
        .map((e) =>
          e.name === extra.name
            ? { ...e, quantity: Math.max(1, (e.quantity || 1) + delta) } // Garante que a quantidade não vá para 0 ou negativa
            : e
        )
        .filter((e) => e.quantity > 0); // Remove extras com quantidade 0 ou negativa

      setSelectedExtras(updatedExtras);
    } else if (delta > 0) {
      // Adiciona o extra caso não exista ainda
      setSelectedExtras([...selectedExtras, { ...extra, quantity: 1 }]);
    }

    // Chamando a função handleSelectExtra após a mudança na quantidade
    handleSelectExtra(extra);
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center bg-gray-200 p-2 w-full rounded-lg"
      >
        Escolha adicionais <FaChevronDown />
      </button>

      {isOpen && (
        <div className="mt-2 border p-2 bg-gray-100">
          {extras.map((extra) => {
            // Encontra o extra selecionado, se existir
            const selectedExtra = selectedExtras.find((e) => e.name === extra.name);
            const quantity = selectedExtra?.quantity || 0;

            return (
              <div key={extra.name} className="flex justify-between items-center py-1">
                <span>{extra.name} (+ R$ {extra.price.toFixed(2)})</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleExtraQuantityChange(extra, -1)}
                    disabled={quantity === 0}
                    className="p-1 bg-gray-300 rounded-lg disabled:opacity-50"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    onClick={() => handleExtraQuantityChange(extra, 1)}
                    className="p-1 bg-gray-300 rounded-lg"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
