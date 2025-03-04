"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Extra {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartItem {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  price: number;
  quantity: number;
  extras?: Extra[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCart: (itemId: number, newQuantity: number, newExtras?: Extra[]) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;

        if (item.extras && item.extras.length > 0) {
          if (!updatedCart[existingItemIndex].extras) {
            updatedCart[existingItemIndex].extras = [];
          }

          item.extras.forEach((newExtra) => {
            const existingExtraIndex = updatedCart[existingItemIndex].extras!.findIndex(
              (e) => e.id === newExtra.id
            );

            if (existingExtraIndex >= 0) {
              updatedCart[existingItemIndex].extras![existingExtraIndex].quantity += newExtra.quantity || 1;
            } else {
              updatedCart[existingItemIndex].extras!.push({ ...newExtra });
            }
          });
        }
        return updatedCart;
      } else {
        return [...prevCart, { ...item }];
      }
    });
  };

  const updateCart = (itemId: number, newQuantity: number, newExtras: Extra[] = []) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity, extras: newExtras } : item
      )
    );
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) return prevCart;
      
      const item = prevCart[itemIndex];
      if (item.quantity > 1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex] = { ...item, quantity: item.quantity - 1 };
        return updatedCart;
      } else {
        return prevCart.filter((item) => item.id !== itemId);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
