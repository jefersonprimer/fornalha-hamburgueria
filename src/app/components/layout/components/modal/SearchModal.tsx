import React from "react";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredItems: any[];
  searchTerm: string;  // Passando searchTerm do componente pai
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;  // Passando a função de mudança do input
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, filteredItems, searchTerm, onSearchChange }) => {
  // Filtra os resultados com base no termo de pesquisa
  const filteredResults = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-lg w-[600px] h-[80%] max-h-[880px]">
        
        {/* Input de pesquisa */}
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}  // Usando a função de mudança do input passada como prop
          placeholder="Buscar..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <h2 className="text-xl font-bold mb-4">Resultados: {searchTerm}</h2>
        <div className="h-[70%] max-h-[800px] overflow-y-auto">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <div key={index} className="mb-4 p-4 border-b flex items-center">
                {/* Imagem do item */}
                <div className="w-1/4 mr-4">
                  <Image
                    src={item.imageSrc} // Aqui, você deve garantir que 'item.imageSrc' é a URL da imagem
                    alt={item.name}
                    width={80} // Ajuste o tamanho conforme necessário
                    height={80} // Ajuste o tamanho conforme necessário
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Informações do item */}
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
