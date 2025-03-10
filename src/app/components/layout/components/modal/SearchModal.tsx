import React, { useState, useRef, useEffect } from "react";
import useSearch from "../../hooks/useSearch";
import MenuItem from "../../../MenuItem";
import SelectedItemModal from "../../../SelectedItemModal";
import { MenuItemType } from "@/types/MenuItemType";
import { Extra } from "@/types/Extras";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { searchTerm, filteredItems, handleSearch } = useSearch();
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSelectedItem(null);
      setQuantity(1);
      setSelectedExtras([]);
    }
  }, [isOpen]);

  const handleSelectExtra = (extra: Extra) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      console.log("Item adicionado ao carrinho", {
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity,
        extras: selectedExtras,
        description: selectedItem.description,
        imageSrc: selectedItem.imageSrc,
      });
    }
    setSelectedItem(null);
    setQuantity(1);
    setSelectedExtras([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div
        className="bg-[#F4F5F7] p-2 w-full h-full max-w-[600px] max-h-[980px] sm:w-[600px] sm:h-[80%] sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full mb-4">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5 19C12.4879 19 14.3164 18.3176 15.7641 17.1742L21.2927 22.7069L22.7074 21.2931L17.1778 15.7595C18.319 14.3126 19 12.4858 19 10.5C19 5.80558 15.1944 2 10.5 2C5.80558 2 2 5.80558 2 10.5C2 15.1944 5.80558 19 10.5 19ZM10.5 17C14.0899 17 17 14.0899 17 10.5C17 6.91015 14.0899 4 10.5 4C6.91015 4 4 6.91015 4 10.5C4 14.0899 6.91015 17 10.5 17Z"
            />
          </svg>

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
            filteredItems.map((item: MenuItemType, index: number) => (
              <MenuItem
                key={`${item.id}-${index}`} // Garantindo chaves únicas
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
            handleQuantityChange={(delta) => setQuantity((prev) => Math.max(1, prev + delta))}
            closeModal={() => setSelectedItem(null)}
            handleAddToCart={handleAddToCart}
            handleSelectExtra={handleSelectExtra} onSave={function (): void {
              throw new Error("Function not implemented.");
            } }          />
        )}
      </div>
    </div>
  );
};

export default SearchModal;
