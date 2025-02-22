"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Pedidos() {
  const { cart } = useCart();
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [casa, setCasa] = useState("");
  const [referencia, setReferencia] = useState("");

  const enviarPedido = () => {
    if (!bairro || !rua || !casa) {
      alert("Por favor, preencha todos os campos do endereço!");
      return;
    }

    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    // Criando a lista de itens do pedido corretamente
    const itensPedido = cart
      .map((item) => {
        // Verificar se o preço é uma string
        let price = item.price;
        
        // Se o preço for uma string com "R$", remover "R$" e substituir vírgula por ponto
        if (typeof price === 'string') {
          price = price.replace("R$", "").trim().replace(",", ".");
        }
        
        // Se o preço for um número, deixar como está
        if (typeof price === 'number') {
          price = price.toFixed(2); // Garantir que tenha 2 casas decimais
        }

        // Converter a string para número
        const priceNumber = parseFloat(price);

        // Verificar se a conversão foi bem-sucedida
        if (isNaN(priceNumber)) {
          // Se o preço não for válido, exibe mensagem de erro
          return `🍽️ *${item.name}* - ${item.quantity}x (R$ 0.00)`;
        }

        const totalPrice = priceNumber * item.quantity;
        return `🍽️ *${item.name}* - ${item.quantity}x (R$ ${totalPrice.toFixed(2)})`;
      })
      .join("\n");

    // Criando a mensagem do endereço
    const endereco = `🏠 *Endereço de entrega:*\n📍 Bairro: ${bairro}\n📍 Rua: ${rua}\n🏡 Casa: ${casa}\n📝 Referência: ${referencia || "Nenhuma"}`;

    // Mensagem final para o WhatsApp
    const mensagem = `Olá! Quero fazer um pedido:\n\n${itensPedido}\n\n${endereco}\n\n🚀 *Aguardo a confirmação!*`;

    // Abrir o WhatsApp com a mensagem pronta
    const telefone = "55996625561";
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Pedidos</h1>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item, index) => {
              // Verificar se o preço é uma string
              let price = item.price;

              // Se o preço for uma string com "R$", remover "R$" e substituir vírgula por ponto
              if (typeof price === 'string') {
                price = price.replace("R$", "").trim().replace(",", ".");
              }

              // Se o preço for um número, deixar como está
              if (typeof price === 'number') {
                price = price.toFixed(2); // Garantir que tenha 2 casas decimais
              }

              // Converter a string para número
              const priceNumber = parseFloat(price);

              const totalPrice = isNaN(priceNumber) ? 0 : priceNumber * item.quantity;
              return (
                <li key={`${item.id}-${index}`} className="flex justify-between items-center border p-4 rounded-lg">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Quantidade: {item.quantity}</p>
                    <p className="text-gray-800 font-bold">
                      R$ {totalPrice.toFixed(2)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Seção do Endereço */}
          <div className="mt-8 p-4 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Endereço de Entrega</h2>
            <input
              type="text"
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Casa / Número"
              value={casa}
              onChange={(e) => setCasa(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Ponto de Referência (opcional)"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            {/* Botão de Fechar Pedido */}
            <button
              onClick={enviarPedido}
              className="w-full bg-green-500 text-white p-3 rounded-lg font-bold text-lg"
            >
              📩 Fechar Pedido via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
