interface ExtraItem {
  name: string;
  price: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number | string;
  quantity: number;
  extras?: ExtraItem[];
}

export const calcularTotalCarrinho = (cart: CartItem[], desconto: number): number => {
  return (
    cart.reduce((total, item) => {
      // Converter preço para número, se for string
      let price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("R$", "").trim().replace(",", "."))
          : item.price;

      if (isNaN(price)) price = 0;

      // Calcular o preço total dos extras (se houver)
      const totalExtrasPrice = item.extras?.reduce((acc, extra) => acc + extra.price, 0) || 0;

      // Calcular o total do item com seus extras, multiplicado pela quantidade
      const totalPrice = (price + totalExtrasPrice) * item.quantity;

      return total + totalPrice;
    }, 0) * (1 - desconto)
  );
};
