import React, { useState, useEffect, useRef } from "react";
import useSearch from "../../hooks/useSearch"; // Importe o hook
import MenuItem from "../../../MenuItem";
import SelectedItemModal from "../../../SelectedItemModal";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredItems: Item[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { searchTerm, filteredItems, handleSearch } = useSearch();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Item[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      handleSearch("");
      setSelectedItem(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#F4F5F7] p-2 w-full h-full max-w-[600px] max-h-[980px] sm:w-[600px] sm:h-[80%] sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full mb-4">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-full pl-10 pr-20 p-2 border border-gray-300 rounded"
          />

          {searchTerm && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-10 top-1/2 transform p-1 hover:rounded hover:bg-gray-200 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
            >
              Limpar
            </button>
          )}

          <button
            onClick={onClose}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:rounded-[50%] hover:bg-gray-200"
          >
            <svg className="size-6" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#374151">
              <path d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
            </svg>
          </button>
        </div>

        <div className="h-[88%] max-h-[800px] overflow-y-auto">
          {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <MenuItem
              key={`${item.id}-${index}`} // Combina id com índice para garantir unicidade
              id={item.id}
              name={item.name}
              description={item.description}
              price={`R$ ${item.price.toFixed(2).replace(".", ",")}`}
              imageSrc={item.imageSrc}
              onClick={() => setSelectedItem(item)}
            />
          ))
          
          ) : (
            <p className="text-center text-gray-500">Nenhum item encontrado.</p>
          )}
        </div>

        {selectedItem && (
          <SelectedItemModal
            selectedItem={selectedItem}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedExtras={selectedExtras}
            setSelectedExtras={setSelectedExtras}
            handleQuantityChange={(delta) =>
              setQuantity((prev) => Math.max(1, prev + delta))
            }
            closeModal={() => setSelectedItem(null)}
          />
        )}
      </div>
    </div>
  );
};

export default SearchModal;
