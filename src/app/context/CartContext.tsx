"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Definição do tipo Extra com quantidade
interface Extra {
  id: number;
  name: string;
  price: number;
  quantity: number; // Agora os extras possuem quantidade
}

// Definição do tipo CartItem com lista de extras
interface CartItem {
  id: number;
  quantity: number;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  extras?: Extra[];
}

// Interface para o contexto do carrinho
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCart: (id: number, quantityChange: number, updatedExtras?: { id: number; quantity: number }[]) => void;
  removeFromCart: (id: number) => void;
}

// Criando o contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Interface das props do Provider
interface CartProviderProps {
  children: ReactNode;
}

// Função para mesclar e atualizar os extras corretamente
const mergeExtras = (existingExtras: Extra[] = [], newExtras: Extra[] = []) => {
  const extrasMap = new Map<number, Extra>();

  [...existingExtras, ...newExtras].forEach((extra) => {
    if (extrasMap.has(extra.id)) {
      extrasMap.set(extra.id, {
        ...extra,
        quantity: extrasMap.get(extra.id)!.quantity + extra.quantity, // Soma a quantidade dos extras iguais
      });
    } else {
      extrasMap.set(extra.id, extra);
    }
  });

  return Array.from(extrasMap.values());
};

// Provider do carrinho
export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Adicionar item ao carrinho (considerando os extras)
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
                extras: mergeExtras(cartItem.extras, item.extras), // Atualiza os extras corretamente
              }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item }];
      }
    });
  };

  // Atualizar quantidade do item e dos extras no carrinho
  const updateCart = (id: number, quantityChange: number, updatedExtras?: { id: number; quantity: number }[]) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              quantity: Math.max(cartItem.quantity + quantityChange, 1),
              extras: updatedExtras
                ? cartItem.extras?.map((extra) => {
                    const updatedExtra = updatedExtras.find((e) => e.id === extra.id);
                    return updatedExtra ? { ...extra, quantity: updatedExtra.quantity } : extra;
                  })
                : cartItem.extras,
            }
          : cartItem
      )
    );
  };

  // Remover item do carrinho
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar o contexto do carrinho
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
}
