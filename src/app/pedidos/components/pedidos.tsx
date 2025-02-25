"use client";

import React, { useState } from "react";
import Carrinho from "../components/Carrinho";
import { useCart } from "../../context/CartContext";
import { formatarMensagem } from "../utils/formatarMensagem";
import { calcularTotalCarrinho } from "../utils/calcularTotalCarrinho";
import { aplicarCupom } from "../utils/aplicarCupom";
import { validarEndereco } from "../utils/validarEndereco";

export default function Pedidos() {
  const { cart } = useCart();
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [casa, setCasa] = useState("");
  const [referencia, setReferencia] = useState("");
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [observacao, setObservacao] = useState(""); // Novo campo
  const [alerta, setAlerta] = useState(""); // Estado para o alerta

  const handleAplicarCupom = () => {
    aplicarCupom(cupom, setDesconto);
  };

  const enviarPedido = () => {
    const total = calcularTotalCarrinho(cart, desconto);

    if (!validarEndereco(bairro, rua, casa)) return;
    if (cart.length === 0) {
      setAlerta("Seu carrinho está vazio!"); // Alerta caso o carrinho esteja vazio
      return;
    }

    if (total < 15) {
      setAlerta("O valor mínimo do pedido é R$ 15,00"); // Alerta caso o total seja inferior a R$ 15
      return;
    }

    const mensagem = formatarMensagem(cart, bairro, rua, casa, referencia, desconto, observacao);
    const telefone = "55996625561";
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  // Calcular o total do carrinho
  const totalCarrinho = calcularTotalCarrinho(cart, desconto);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-400 m-6">
      <h1 className="text-3xl font-bold mb-4">Pedidos</h1>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <Carrinho />

          {/* Alerta de erro */}
          {alerta && (
            <div className="bg-red-500 text-white p-4 rounded-md mb-4">
              {alerta}
            </div>
          )}

          {/* Endereço */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Endereço de Entrega</h2>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Bairro</label>
              <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Digite o bairro" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Rua</label>
              <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Digite a rua" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Casa / Número</label>
              <input type="text" value={casa} onChange={(e) => setCasa(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Número da casa" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Ponto de Referência (opcional)</label>
              <input type="text" value={referencia} onChange={(e) => setReferencia(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Digite um ponto de referência (opcional)" />
            </div>
          </div>

          {/* Observação do Pedido */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Observação do Pedido</h2>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full p-2 border rounded-md mt-2"
              placeholder="Digite observações, como 'Sem cebola', 'Molho extra', etc."
              rows={3}
            />
          </div>

          {/* Cupom */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Cupom de Desconto</h2>
            <input type="text" value={cupom} onChange={(e) => setCupom(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Digite o código do cupom" />
            <button onClick={handleAplicarCupom} className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold text-lg mt-4">Aplicar Cupom</button>
          </div>

          {/* Total */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Total do Pedido</h2>
            <p className="text-xl font-bold mt-2">R$ {totalCarrinho.toFixed(2)}</p>
          </div>

          {/* Botão Pedido */}
          <button
            onClick={enviarPedido}
            className={`w-full p-3 rounded-lg font-bold text-lg mt-6 ${
              totalCarrinho >= 15 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
            }`}
          >
            📩 Fechar Pedido via WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
