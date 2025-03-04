"use client";

import React, { useState, useEffect } from "react";
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
  const [observacao, setObservacao] = useState("");
  const [alerta, setAlerta] = useState("");
  const [horarioDisponivel, setHorarioDisponivel] = useState(false);

  useEffect(() => {
    const agora = new Date();
    const hora = agora.getHours();
    setHorarioDisponivel(hora >= 18 && hora < 23);
  }, []);

  const handleAplicarCupom = () => {
    aplicarCupom(cupom, setDesconto);
  };

  const enviarPedido = () => {
    const total = calcularTotalCarrinho(cart, desconto);

    if (!validarEndereco(bairro, rua, casa)) return;
    if (cart.length === 0) {
      setAlerta("Seu carrinho está vazio!");
      return;
    }

    if (total < 15) {
      setAlerta("O valor mínimo do pedido é R$ 15,00");
      return;
    }

    if (!horarioDisponivel) return;

    const mensagem = formatarMensagem(cart, bairro, rua, casa, referencia, desconto, observacao);
    const telefone = "55996625561";
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  const totalCarrinho = calcularTotalCarrinho(cart, desconto);

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-6 bg-[#F9FAFB] m-6">
      <h1 className="text-3xl font-bold mb-4">Pedidos</h1>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <Carrinho />

          {alerta && (
            <div className="bg-red-500 text-white p-4 rounded-md mb-4">
              {alerta}
            </div>
          )}

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Endereço de Entrega</h2>
            <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Bairro" />
            <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Rua" />
            <input type="text" value={casa} onChange={(e) => setCasa(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Casa / Número" />
            <input type="text" value={referencia} onChange={(e) => setReferencia(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Ponto de Referência (opcional)" />
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Observação do Pedido</h2>
            <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Ex: Sem cebola, Molho extra" rows={3} />
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Cupom de Desconto</h2>
            <input type="text" value={cupom} onChange={(e) => setCupom(e.target.value)} className="w-full p-2 border rounded-md mt-2" placeholder="Código do cupom" />
            <button onClick={handleAplicarCupom} className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold text-lg mt-4">Aplicar Cupom</button>
          </div>

          <div className="flex space-x-[65%] justify-center items-center pt-4">
            <h2 className="text-xl font-semibold">Total</h2>
            <p className="text-xl font-bold ">R$ {totalCarrinho.toFixed(2)}</p>
          </div>

          <button
            onClick={enviarPedido}
            className={`w-full p-3 rounded-lg font-bold text-lg mt-6 ${
              totalCarrinho >= 15 && horarioDisponivel ? "bg-green-500 text-white" : "bg-[#8D8D8D] text-[#FFFFFF] cursor-not-allowed"
            }`}
            disabled={!horarioDisponivel || totalCarrinho < 15}
            style={!horarioDisponivel ? { cursor: "not-allowed", opacity: 0.6 } : {}}
          >
            {horarioDisponivel ? "Fechar Pedido via WhatsApp" : "Estabelecimento Fechado"}
          </button>
        </>
      )}
    </div>
  );
}
