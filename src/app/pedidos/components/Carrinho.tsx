import { useCart } from "../../context/CartContext";

export default function Carrinho() {
  const { cart, updateCart, removeFromCart } = useCart();

  // Funções para aumentar e diminuir a quantidade de itens
  const aumentarQuantidade = (id: string) => {
    updateCart(id, 1); // Aumenta a quantidade do item específico
  };

  const diminuirQuantidade = (id: string) => {
    updateCart(id, -1); // Diminui a quantidade do item específico
  };

  const removerItem = (id: string) => {
    removeFromCart(id); // Remove o item específico
  };

  return (
    <div>
      <ul className="space-y-4">
        {cart.map((item, index) => {
          let price =
            typeof item.price === "string"
              ? parseFloat(item.price.replace("R$", "").trim().replace(",", "."))
              : item.price;

          if (isNaN(price)) price = 0;
          const totalPrice = price * item.quantity;

          return (
            <li key={item.id || index} className="flex justify-between items-center border p-4 rounded-lg">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <div className="flex items-center space-x-2">
                  {/* Botões de quantidade */}
                  <button
                    onClick={() => diminuirQuantidade(item.id)}
                    className="bg-gray-200 p-1 rounded-lg"
                  >
                    -
                  </button>
                  <p className="text-gray-600">Quantidade: {item.quantity}</p>
                  <button
                    onClick={() => aumentarQuantidade(item.id)}
                    className="bg-gray-200 p-1 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-800 font-bold">R$ {totalPrice.toFixed(2)}</p>
              </div>

              {/* Botão de remover */}
              <button
                type="button"
                onClick={() => removerItem(item.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ❌ Remover
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
