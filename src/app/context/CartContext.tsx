"use client";

import { createContext, useContext, useState } from "react";

// Criando o contexto do carrinho
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Função para adicionar um item ao carrinho
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Verifica se o item já existe no carrinho (mesmo ID e mesmo nome)
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id && cartItem.name === item.name
      );

      if (existingItem) {
        // Se já existe, apenas aumenta a quantidade do item certo
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Se for um novo item, adiciona ao carrinho corretamente
        return [...prevCart, { ...item }];
      }
    });
  };

  // Função para atualizar a quantidade de um item (aumentar ou diminuir)
  const updateCart = (id, quantityChange) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: Math.max(cartItem.quantity + quantityChange, 1) } // Evita quantidade negativa
          : cartItem
      )
    );
  };

  // Função para remover um item do carrinho
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para acessar o carrinho
export function useCart() {
  return useContext(CartContext);
}
