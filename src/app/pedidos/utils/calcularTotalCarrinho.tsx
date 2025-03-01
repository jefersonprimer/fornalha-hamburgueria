import { MenuItemType } from "@/types/MenuItemType";

export const calcularTotalCarrinho = (cart: MenuItemType[], desconto: number): number => {
  if (desconto < 0 || desconto > 1) {
    throw new Error("Desconto deve ser um valor entre 0 e 1.");
  }

  return cart.reduce((total, item) => {
    // Agora price é garantido como número
    const price = item.price;

    // Se price não for um número válido, definimos como 0
    const validPrice = isNaN(price) ? 0 : price;

    // Calcular o preço total dos extras (se houver)
    const totalExtrasPrice = item.extras?.reduce((acc, extra) => acc + extra.price, 0) || 0;

    // Calcular o total com extras e quantidade
    const totalPrice = (validPrice + totalExtrasPrice) * item.quantity;

    return total + totalPrice;
  }, 0) * (1 - desconto);
};
