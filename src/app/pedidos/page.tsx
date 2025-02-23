"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Pedidos() {
  const { cart } = useCart();
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [casa, setCasa] = useState("");
  const [referencia, setReferencia] = useState("");

  // Função para obter a localização e buscar o endereço
  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Lat: ${latitude}, Long: ${longitude}`);
            await getAddress(latitude, longitude); // Buscar endereço
          },
          (error) => {
            console.error("Erro ao obter localização:", error);
          }
        );
      } else {
        console.error("Geolocalização não suportada no navegador.");
      }
    };

    getLocation();
  }, []);

  // Função para buscar o endereço com a API do OpenStreetMap (Nominatim)
  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      console.log("Endereço obtido:", data);

      if (data.address) {
        setBairro(data.address.suburb || data.address.city || "");
        setRua(data.address.road || "");
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const enviarPedido = () => {
    if (!bairro || !rua || !casa) {
      alert("Por favor, preencha todos os campos do endereço!");
      return;
    }

    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

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

    const mensagem = `Olá! Quero fazer um pedido:\n\n${itensPedido}\n\n${endereco}\n\n🚀 *Aguardo a confirmação!*`;
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
        <div>
          <ul className="space-y-4">
            {cart.map((item, index) => {
              let price = typeof item.price === "string"
                ? parseFloat(item.price.replace("R$", "").trim().replace(",", "."))
                : item.price;

              if (isNaN(price)) price = 0;
              const totalPrice = price * item.quantity;

              return (
                <li key={`${item.id}-${index}`} className="flex justify-between items-center border p-4 rounded-lg">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Quantidade: {item.quantity}</p>
                    <p className="text-gray-800 font-bold">R$ {totalPrice.toFixed(2)}</p>
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
