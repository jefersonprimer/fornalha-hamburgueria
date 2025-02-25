"use client"

import { createContext, useContext, useState, ReactNode } from "react";

// Defina a interface para o contexto
interface CartItem {
  id: number; // ID como number
  quantity: number;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  extras?: { id: number; name: string; price: number }[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCart: (id: number, quantityChange: number) => void; // ID como number
  removeFromCart: (id: number) => void; // ID como number
}

// Defina um contexto com um valor inicial vazio (será sobrescrito pelo provider)
const CartContext = createContext<CartContextType | undefined>(undefined);

// Defina o tipo das props do Provider
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item }];
      }
    });
  };

  const updateCart = (id: number, quantityChange: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: Math.max(cartItem.quantity + quantityChange, 1) }
          : cartItem
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para acessar o contexto
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
}
