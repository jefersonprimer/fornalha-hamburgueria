import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function Carrinho() {
  const { cart, updateCart, removeFromCart } = useCart();
  const [openItemId, setOpenItemId] = useState<number | null>(null); // Estado para controlar qual item está expandido

  // Função para reduzir a quantidade ou remover o item completamente
  const reduzirOuRemoverItem = (id: number, quantidade: number) => {
    if (quantidade > 1) {
      updateCart(id, -1); // Se tiver mais de 1, diminui a quantidade
    } else {
      // Quando a quantidade chegar a 1, removemos o item
      removeFromCart(id); // Remove o item completamente
    }
  };

  // Função para adicionar a quantidade de um item
  const adicionarQuantidade = (id: number) => {
    updateCart(id, 1); // Aumenta a quantidade de 1 item
  };

  // Função para diminuir a quantidade de um item
  const diminuirQuantidade = (id: number) => {
    updateCart(id, -1); // Diminui a quantidade de 1 item
  };

  // Função para alternar a visibilidade do dropdown do item
  const toggleItemDetails = (id: number) => {
    setOpenItemId(openItemId === id ? null : id); // Alterna a exibição do item
  };

  return (
    <div>
      <ul className="space-y-2">
        {cart.map((item, index) => {
          let price = item.price;
          let totalExtrasPrice = 0;

          // Calculando o preço dos extras
          if (item.extras) {
            totalExtrasPrice = item.extras.reduce((acc, extra) => acc + (extra.price * (extra.quantity || 1)), 0); // Agora considera a quantidade do extra
          }

          // Garantindo que o preço do item principal seja válido
          if (isNaN(price)) price = 0;

          // Calculando o preço total considerando a quantidade e os extras
          const totalPrice = (price + totalExtrasPrice) * item.quantity;

          return (
            <li key={item.id || index} className="flex flex-col justify-between items-start border p-2 rounded-md bg-gray-100">
              {/* Linha principal do item */}
              <div className="flex justify-between items-center w-full">
              <div className="flex flex-row gap-5 justify-center items-center">
                {/* Botões de adicionar/remover quantidade */}
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

                {/* Nome do item */}
                <span className="text-lg sm:text-sm font-semibold">{item.name}</span>

                {/* Preço do item */}
                <span className="text-gray-800 font-bold">R$ {totalPrice.toFixed(2)}</span>

                {/* Botão de remover */}
                <button
                  type="button"
                  onClick={() => reduzirOuRemoverItem(item.id, item.quantity)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Remover
                </button>
                
              </div>

                {/* Ícone de seta para alternar visibilidade do dropdown */}
                <button
                  onClick={() => toggleItemDetails(item.id)}
                  className="ml-4 text-gray-600 hover:text-gray-800"
                >
                  {openItemId === item.id ? "X" : "►"}
                </button>
              </div>

              {/* Dropdown com os detalhes adicionais */}
              {openItemId === item.id && (
                <div className="ml-4 text-sm text-gray-600">
                  {/* Mostrar extras */}
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
    </div>
  );
}
