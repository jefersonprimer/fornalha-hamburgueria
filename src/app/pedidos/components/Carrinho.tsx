import { useCart } from "../../context/CartContext";

export default function Carrinho() {
  const { cart, updateCart, removeFromCart } = useCart();

  // Função para reduzir a quantidade ou remover o item completamente
  const reduzirOuRemoverItem = (id: string, quantidade: number) => {
    if (quantidade > 1) {
      updateCart(id, -1); // Se tiver mais de 1, diminui a quantidade
    } else {
      // Quando a quantidade chegar a 1, removemos o item
      removeFromCart(id); // Remove o item completamente
    }
  };

  return (
    <div>
      <ul className="space-y-2">
        {cart.map((item, index) => {
          let price =
            typeof item.price === "string"
              ? parseFloat(item.price.replace("R$", "").trim().replace(",", "."))
              : item.price;

          if (isNaN(price)) price = 0;
          const totalPrice = price * item.quantity;

          return (
            <li key={item.id || index} className="flex justify-between items-center border p-2 rounded-md bg-gray-100">
              <span className="text-lg font-semibold">{item.name}</span>
              <span className="text-gray-800 font-bold">R$ {totalPrice.toFixed(2)}</span>
              <span className="text-gray-600">x{item.quantity}</span>

              {/* Botão de remover (reduz ou remove) */}
              <button
                type="button"
                onClick={() => reduzirOuRemoverItem(item.id, item.quantity)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ❌
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
