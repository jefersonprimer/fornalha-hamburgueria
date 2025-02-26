import React from "react";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredItems: any[];
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectItem: (item: any) => void;  // Nova função passada para selecionar o item
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  filteredItems,
  searchTerm,
  onSearchChange,
  handleSelectItem
}) => {
  const filteredResults = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[600px] h-[80%] max-h-[880px]">
        
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Buscar..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <h2 className="text-xl font-bold mb-4">Resultados: {searchTerm}</h2>
        <div className="h-[70%] max-h-[800px] overflow-y-auto">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <div 
                key={index} 
                className="mb-4 p-4 border-b flex items-center cursor-pointer" 
                onClick={() => handleSelectItem(item)}  // Adicionando o clique
              >
                <div className="w-1/4 mr-4">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="w-3/4">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{item.description}</p>
                  <p className="font-bold text-lg">{`R$ ${item.price}`}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum item encontrado.</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
