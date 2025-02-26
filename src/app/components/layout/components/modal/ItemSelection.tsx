import React, { useState } from "react";
import SelectedItemModal from "../../../SelectedItemModal";  // Importe o modal de item selecionado
import SearchModal from "./SearchModal";  // Importe o modal de pesquisa
import { useCart } from "../../../../context/CartContext";  // Caso esteja usando contexto de carrinho

// Componente Pai
export default function ItemSelection() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);  // Estado para abrir/fechar o modal de pesquisa
  const [selectedItem, setSelectedItem] = useState(null);  // Estado para armazenar o item selecionado
  const [searchTerm, setSearchTerm] = useState("");  // Estado para o termo de busca
  const [quantity, setQuantity] = useState(1);  // Estado para controlar a quantidade
  const [selectedExtras, setSelectedExtras] = useState([]);  // Estado para os extras selecionados

  // Array de itens filtrados para busca
  const filteredItems = [
    { id: 1, name: "Item A", description: "Descrição do Item A", price: 20, imageSrc: "/path/to/imageA.jpg" },
    { id: 2, name: "Item B", description: "Descrição do Item B", price: 30, imageSrc: "/path/to/imageB.jpg" },
    // Adicione outros itens conforme necessário
  ];

  // Função que atualiza o termo de busca
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Função chamada ao selecionar um item da pesquisa
  const handleSelectItem = (item: any) => {
    setSelectedItem(item);  // Atualiza o item selecionado
    setIsSearchOpen(false);  // Fecha o modal de pesquisa
  };

  // Função para alterar a quantidade
  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => prevQuantity + delta);
  };

  // Função para fechar o modal de item selecionado
  const handleCloseModal = () => {
    setSelectedItem(null);  // Reseta o estado do item selecionado
  };

  return (
    <div>
      {/* Botão para abrir o modal de pesquisa */}
      <button onClick={() => setIsSearchOpen(true)}>Buscar Item</button>

      {/* Modal de Pesquisa */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}  // Função para fechar o modal de pesquisa
        filteredItems={filteredItems}  // Passa os itens filtrados para o modal
        searchTerm={searchTerm}  // Passa o termo de busca
        onSearchChange={handleSearchChange}  // Passa a função para atualizar o termo de busca
        handleSelectItem={handleSelectItem}  // Passa a função para selecionar o item
      />

      {/* Modal de Item Selecionado */}
      {selectedItem && (
        <SelectedItemModal
          selectedItem={selectedItem}  // Passa o item selecionado para o modal
          quantity={quantity}  // Passa a quantidade atual
          setQuantity={setQuantity}  // Passa a função para atualizar a quantidade
          selectedExtras={selectedExtras}  // Passa os extras selecionados
          setSelectedExtras={setSelectedExtras}  // Passa a função para atualizar os extras
          handleQuantityChange={handleQuantityChange}  // Passa a função para alterar a quantidade
          closeModal={handleCloseModal}  // Passa a função para fechar o modal de item
        />
      )}
    </div>
  );
}
