import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Extra {
  name: string;
  price: number;
}

interface ExtrasDropdownProps {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: (extras: Extra[]) => void;
}

export default function ExtrasDropdown({ extras, selectedExtras, setSelectedExtras }: ExtrasDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras(
      selectedExtras.some((e) => e.name === extra.name)
        ? selectedExtras.filter((e) => e.name !== extra.name)
        : [...selectedExtras, extra]
    );
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
        <div className="mt-2 border p-2 rounded-lg bg-gray-100">
          {extras.map((extra, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span>{extra.name} (+ R$ {extra.price.toFixed(2)})</span>
              <input
                type="checkbox"
                checked={selectedExtras.some((e) => e.name === extra.name)}
                onChange={() => toggleExtra(extra)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
