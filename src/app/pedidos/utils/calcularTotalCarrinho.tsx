export const calcularTotalCarrinho = (cart: any[], desconto: number) => {
    return cart.reduce((total, item) => {
      let price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("R$", "").trim().replace(",", "."))
          : item.price;
  
      if (isNaN(price)) price = 0;
      return total + price * item.quantity;
    }, 0) * (1 - desconto);
  };
  