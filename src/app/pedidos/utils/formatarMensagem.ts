export function formatarMensagem(
  cart: any[],
  bairro: string,
  rua: string,
  casa: string,
  referencia: string,
  desconto: number,
  observacao: string // Novo campo
) {
  const totalComDesconto =
    cart.reduce((total, item) => {
      let price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("R$", "").trim().replace(",", "."))
          : item.price;

      if (isNaN(price)) price = 0;
      return total + price * item.quantity;
    }, 0) * (1 - desconto);

  const itensPedido = cart
    .map((item) => {
      let price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("R$", "").trim().replace(",", "."))
          : item.price;

      if (isNaN(price)) price = 0;
      const totalPrice = price * item.quantity;
      return `🍽️ *${item.name}* - ${item.quantity}x (R$ ${totalPrice.toFixed(2)})`;
    })
    .join("\n");

  const endereco = `🏠 *Endereço de entrega:*\n📍 Bairro: ${bairro}\n📍 Rua: ${rua}\n🏡 Casa: ${casa}\n📝 Referência: ${referencia || "Nenhuma"}`;

  // Adiciona a observação se houver algo escrito
  const textoObservacao = observacao.trim()
    ? `\n📌 *Observação:* ${observacao}`
    : "";

  return `Olá! Quero fazer um pedido:\n\n${itensPedido}\n\n${endereco}${textoObservacao}\n\n🚀 *Total com desconto: R$ ${totalComDesconto.toFixed(2)}* \n\nAguardo a confirmação!`;
}
