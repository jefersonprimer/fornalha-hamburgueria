export const calcularTotalCarrinho = (cart: any[], desconto: number) => {
  return cart.reduce((total, item) => {
    // Calcular o preço do item principal
    let price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace("R$", "").trim().replace(",", "."))
        : item.price;

    if (isNaN(price)) price = 0;

    // Calcular o preço total dos extras (se houver)
    let totalExtrasPrice = 0;
    if (item.extras) {
      totalExtrasPrice = item.extras.reduce((acc, extra) => acc + extra.price, 0);
    }

    // Calcular o total do item com seus extras, multiplicado pela quantidade
    const totalPrice = (price + totalExtrasPrice) * item.quantity;

    return total + totalPrice;
  }, 0) * (1 - desconto);
};
