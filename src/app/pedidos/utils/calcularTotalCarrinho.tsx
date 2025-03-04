import { MenuItemType } from "@/types/MenuItemType";

type CartItem = MenuItemType & {
  quantity: number;
  extras?: { price: number; quantity: number }[];
};

export const calcularTotalCarrinho = (cart: CartItem[], desconto = 0): number => {
  const subtotal = cart.reduce((total, item) => {
    const extrasTotal = item.extras
      ? item.extras.reduce((acc, extra) => acc + extra.price * (extra.quantity || 1), 0)
      : 0;

    return total + (item.price + extrasTotal) * item.quantity;
  }, 0);

  return subtotal - desconto;
};
