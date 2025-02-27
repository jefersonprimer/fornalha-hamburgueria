import { useState } from "react";
import { useCart } from "../../context/CartContext";
import SelectedItemModal from "@/app/components/SelectedItemModal";
import ExtrasDropdown from "@/app/components/ExtrasDropdown";

export default function Carrinho() {
  const { cart, updateCart, removeFromCart } = useCart();
  const [openItemId, setOpenItemId] = useState<number | null>(null); // Estado para controlar qual item está expandido
  const [selectedItem, setSelectedItem] = useState(null); // Estado para armazenar o item selecionado
  const [modalAberto, setModalAberto] = useState(false); // Estado para controlar a exibição do modal

  // Função para selecionar um item e abrir o modal
  const selectItem = (item) => {
    setSelectedItem(item);
    setModalAberto(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setSelectedItem(null);
    setModalAberto(false);
  };

  // Função para reduzir a quantidade ou remover o item completamente
  const reduzirOuRemoverItem = (id: number, quantidade: number) => {
    if (quantidade > 1) {
      updateCart(id, -1);
    } else {
      removeFromCart(id);
    }
  };

  // Função para adicionar a quantidade de um item
  const adicionarQuantidade = (id: number) => {
    updateCart(id, 1);
  };

  // Função para diminuir a quantidade de um item
  const diminuirQuantidade = (id: number) => {
    updateCart(id, -1);
  };

  // Função para alternar a visibilidade do dropdown do item
  const toggleItemDetails = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div>
      <ul className="space-y-2">
        {cart.map((item, index) => {
          let price = item.price;
          let totalExtrasPrice = 0;

          if (item.extras) {
            totalExtrasPrice = item.extras.reduce(
              (acc, extra) => acc + (extra.price * (extra.quantity || 1)),
              0
            );
          }

          if (isNaN(price)) price = 0;
          const totalPrice = (price + totalExtrasPrice) * item.quantity;

          return (
            <li key={item.id || index} className="flex flex-col justify-between items-start border p-2 rounded-md bg-gray-100">
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-row gap-20 justify-center items-center">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => diminuirQuantidade(item.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      -
                    </button>
                    <span className="text-gray-600">x{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => adicionarQuantidade(item.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-lg sm:text-sm font-semibold">{item.name}</span>
                  <span className="text-gray-800 font-bold">R$ {totalPrice.toFixed(2)}</span>

                  {/* Botão Editar */}
                  <button
                    type="button"
                    onClick={() => selectItem(item)}
                    className="text-blue-500 hover:text-blue-700 font-bold"
                  >
                    Editar
                  </button>

                  {/* Botão de remover */}
                  <button
                    type="button"
                    onClick={() => reduzirOuRemoverItem(item.id, item.quantity)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remover
                  </button>
                </div>

                <button
                  onClick={() => toggleItemDetails(item.id)}
                  className="ml-4 text-gray-600 hover:text-gray-800"
                >
                  {openItemId === item.id ? "X" : "►"}
                </button>
              </div>

              {openItemId === item.id && (
                <div className="ml-4 text-sm text-gray-600">
                  {item.extras && (
                    <div className="mb-2">
                      <span>Adicionais: </span>
                      {item.extras.map((extra, extraIndex) => (
                        <span key={extraIndex}>
                          {extra.quantity}x {extra.name} (+ R$ {(extra.price * extra.quantity!).toFixed(2)})
                          {extraIndex < item.extras.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Modal de Edição */}
      {modalAberto && selectedItem && (
        <SelectedItemModal
          selectedItem={selectedItem}
          quantity={selectedItem.quantity}
          setQuantity={(newQuantity) =>
            setSelectedItem((prev) => ({ ...prev, quantity: newQuantity }))
          }
          selectedExtras={selectedItem.extras || []}
          setSelectedExtras={(newExtras) =>
            setSelectedItem((prev) => ({ ...prev, extras: newExtras }))
          }
          handleQuantityChange={(delta) =>
            setSelectedItem((prev) => ({ ...prev, quantity: prev.quantity + delta }))
          }
          closeModal={fecharModal}
        />
      )}
    </div>
  );
}
