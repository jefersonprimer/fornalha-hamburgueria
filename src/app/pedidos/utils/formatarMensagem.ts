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

      // Construir a mensagem do item principal
      let mensagemItem = `🍽️ *${item.name}* - ${item.quantity}x (R$ ${totalPrice.toFixed(2)})`;

      // Adicionar extras, se houver
      if (item.extras && item.extras.length > 0) {
        const extrasMensagem = item.extras
          .map((extra: any) => {
            return `  ➕ *${extra.name}* (+R$ ${extra.price.toFixed(2)})`; // Mostra o nome e preço do extra
          })
          .join("\n");
        mensagemItem += `\n${extrasMensagem}`; // Adiciona os extras à mensagem do item
      }

      return mensagemItem;
    })
    .join("\n");

  const endereco = `🏠 *Endereço de entrega:*\n📍 Bairro: ${bairro}\n📍 Rua: ${rua}\n🏡 Casa: ${casa}\n📝 Referência: ${referencia || "Nenhuma"}`;

  // Adiciona a observação se houver algo escrito
  const textoObservacao = observacao.trim()
    ? `\n📌 *Observação:* ${observacao}`
    : "";

  return `Olá! Quero fazer um pedido:\n\n${itensPedido}\n\n${endereco}${textoObservacao}\n\n🚀 *Total com desconto: R$ ${totalComDesconto.toFixed(2)}* \n\nAguardo a confirmação!`;
}
