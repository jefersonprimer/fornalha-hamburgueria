import { useCart } from "@/app/context/CartContext";
import { MenuItemType } from "@/types/MenuItemType"; // ou o caminho correto
import { useState } from "react";

export default function Carrinho() {
  const { cart, updateCart, removeFromCart } = useCart();
  const [openItemId, setOpenItemId] = useState<number | null>(null); // Estado para controlar qual item está expandido

  // Tipando o cart para ser um array de MenuItemType
  const cartItems: MenuItemType[] = cart;

  const reduzirOuRemoverItem = (id: number, quantidade: number) => {
    if (quantidade > 1) {
      updateCart(id, -1); // Se tiver mais de 1, diminui a quantidade
    } else {
      // Quando a quantidade chegar a 1, removemos o item
      removeFromCart(id); // Remove o item completamente
    }
  };

  const adicionarQuantidade = (id: number) => {
    updateCart(id, 1); // Aumenta a quantidade de 1 item
  };

  const diminuirQuantidade = (id: number) => {
    updateCart(id, -1); // Diminui a quantidade de 1 item
  };

  const toggleItemDetails = (id: number) => {
    setOpenItemId(openItemId === id ? null : id); // Alterna a exibição do item
  };

  return (
    <div>
      <ul className="space-y-2">
        {cartItems.map((item, index) => {
          let price = item.price;
          let totalExtrasPrice = 0;

          // Calculando o preço dos extras
          if (item.extras) {
            totalExtrasPrice = item.extras.reduce((acc, extra) => acc + (extra.price * (extra.quantity || 1)), 0);
          }

          if (isNaN(price)) price = 0;

          const totalPrice = (price + totalExtrasPrice) * item.quantity;

          return (
            <li key={item.id || index} className="flex flex-col justify-between items-start border p-2 rounded-md bg-gray-100">
              <div className="flex justify-between items-center">
                <span>{item.name}</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <button onClick={() => diminuirQuantidade(item.id)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => adicionarQuantidade(item.id)}>+</button>
              </div>
              <div className="flex justify-between items-center">
                <button onClick={() => reduzirOuRemoverItem(item.id, item.quantity)}>
                  {item.quantity > 1 ? 'Reduzir' : 'Remover'}
                </button>
                <button onClick={() => toggleItemDetails(item.id)}>
                  {openItemId === item.id ? 'Esconder detalhes' : 'Mostrar detalhes'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
