import React, { useState } from "react";
import { FaChevronDown, FaMinus, FaPlus } from "react-icons/fa";

interface Extra {
  name: string;
  price: number;
  quantity?: number; // Adicionando quantidade ao tipo Extra
}

interface ExtrasDropdownProps {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: (extras: Extra[]) => void;
}

export default function ExtrasDropdown({ extras, selectedExtras, setSelectedExtras }: ExtrasDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExtraQuantityChange = (extra: Extra, delta: number) => {
    const existingExtra = selectedExtras.find((e) => e.name === extra.name);

    if (existingExtra) {
      const updatedExtras = selectedExtras
        .map((e) =>
          e.name === extra.name
            ? { ...e, quantity: Math.max(1, (e.quantity || 1) + delta) }
            : e
        )
        .filter((e) => e.quantity! > 0); // Remove se a quantidade for 0

      setSelectedExtras(updatedExtras);
    } else if (delta > 0) {
      setSelectedExtras([...selectedExtras, { ...extra, quantity: 1 }]);
    }
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
          {extras.map((extra, index) => {
            const selectedExtra = selectedExtras.find((e) => e.name === extra.name);
            const quantity = selectedExtra?.quantity || 0;

            return (
              <div key={index} className="flex justify-between items-center py-1">
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
