"use client"

import React, { useState } from "react";
import Carrinho from "./components/Carrinho";
import { useCart } from "../context/CartContext";

// Função para calcular o preço total do carrinho
const calcularTotalCarrinho = (cart: any[], desconto: number) => {
  return cart.reduce((total, item) => {
    let price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace("R$", "").trim().replace(",", "."))
        : item.price;

    if (isNaN(price)) price = 0;
    return total + price * item.quantity;
  }, 0) * (1 - desconto); // Aplica o desconto porcentual diretamente
};

export default function Pedidos() {
  const { cart } = useCart();
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [casa, setCasa] = useState("");
  const [referencia, setReferencia] = useState("");
  const [cupom, setCupom] = useState(""); // Estado para o cupom
  const [desconto, setDesconto] = useState(0); // Desconto inicial é zero

  // Função para aplicar o cupom de desconto
  const aplicarCupom = () => {
    // Verifique se o cupom é válido
    if (cupom === "DESCONTO10") {
      setDesconto(0.1); // Aplica 10% de desconto
      alert("Cupom de desconto aplicado com sucesso!");
    } else {
      alert("Cupom inválido.");
      setDesconto(0); // Resetando o desconto se o cupom for inválido
    }
  };

  const enviarPedido = () => {
    console.log("Bairro:", bairro);
    console.log("Rua:", rua);
    console.log("Casa:", casa);
    console.log("Referência:", referencia);

    if (!bairro || !rua || !casa) {
      alert("Por favor, preencha todos os campos do endereço!");
      return;
    }

    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    // Calcule o total com o desconto
    const totalComDesconto = calcularTotalCarrinho(cart, desconto).toFixed(2);

    const itensPedido = cart
      .map((item) => {
        let price = typeof item.price === "string"
          ? parseFloat(item.price.replace("R$", "").trim().replace(",", ".")) 
          : item.price;

        if (isNaN(price)) price = 0;
        const totalPrice = price * item.quantity;
        return `🍽️ *${item.name}* - ${item.quantity}x (R$ ${totalPrice.toFixed(2)})`;
      })
      .join("\n");

    const endereco = `🏠 *Endereço de entrega:*\n📍 Bairro: ${bairro}\n📍 Rua: ${rua}\n🏡 Casa: ${casa}\n📝 Referência: ${referencia || "Nenhuma"}`;

    // Inclua o valor com desconto na mensagem
    const mensagem = `Olá! Quero fazer um pedido:\n\n${itensPedido}\n\n${endereco}\n\n🚀 *Total com desconto: R$ ${totalComDesconto}* \n\nAguardo a confirmação!`;

    const telefone = "55996625561";
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white m-6">
      <h1 className="text-3xl font-bold mb-4">Pedidos</h1>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <Carrinho />

          {/* Exibição do endereço */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Endereço de Entrega</h2>

            <div className="mt-4">
              <label className="block text-sm font-semibold">Bairro</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full p-2 border rounded-md mt-2"
                placeholder="Digite o bairro"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold">Rua</label>
              <input
                type="text"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                className="w-full p-2 border rounded-md mt-2"
                placeholder="Digite a rua"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold">Casa / Número</label>
              <input
                type="text"
                value={casa}
                onChange={(e) => setCasa(e.target.value)}
                className="w-full p-2 border rounded-md mt-2"
                placeholder="Número da casa"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold">Ponto de Referência (opcional)</label>
              <input
                type="text"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                className="w-full p-2 border rounded-md mt-2"
                placeholder="Digite um ponto de referência (opcional)"
              />
            </div>
          </div>

          {/* Seção de Cupom */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Cupom de Desconto</h2>
            <input
              type="text"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              className="w-full p-2 border rounded-md mt-2"
              placeholder="Digite o código do cupom"
            />
            <button
              onClick={aplicarCupom}
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold text-lg mt-4"
            >
              Aplicar Cupom
            </button>
          </div>

          {/* Exibindo o total */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Total do Pedido</h2>
            <p className="text-xl font-bold mt-2">R$ {calcularTotalCarrinho(cart, desconto).toFixed(2)}</p>
          </div>

          {/* Botão para enviar o pedido */}
          <button
            onClick={enviarPedido}
            className="w-full bg-green-500 text-white p-3 rounded-lg font-bold text-lg mt-6"
          >
            📩 Fechar Pedido via WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
