export function formatarMensagem(
  cart: any[],
  bairro: string,
  rua: string,
  casa: string,
  referencia: string,
  desconto: number,
  observacao: string
) {
  // Calculando o total com desconto
  const totalComDesconto =
    cart.reduce((total, item) => {
      let price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("R$", "").trim().replace(",", "."))
          : item.price;

      if (isNaN(price)) price = 0;
      return total + price * item.quantity;
    }, 0) * (1 - desconto);

  // Montando a mensagem dos itens
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
            let extraPrice =
              typeof extra.price === "string"
                ? parseFloat(extra.price.replace("R$", "").trim().replace(",", "."))
                : extra.price;

            if (isNaN(extraPrice)) extraPrice = 0;
            
            const extraTotal = extraPrice * extra.quantity; // Multiplica pelo número de vezes que o extra foi selecionado
            
            return `  ➕ *${extra.name}* - ${extra.quantity}x (+R$ ${extraTotal.toFixed(2)})`; // Inclui a quantidade correta
          })
          .join("\n");

        mensagemItem += `\n${extrasMensagem}`; // Adiciona os extras à mensagem do item
      }

      return mensagemItem;
    })
    .join("\n");

  // Formatando o endereço
  const endereco = `🏠 *Endereço de entrega:*\n📍 Bairro: ${bairro}\n📍 Rua: ${rua}\n🏡 Casa: ${casa}\n📝 Referência: ${referencia || "Nenhuma"}`;

  // Adiciona a observação se houver algo escrito
  const textoObservacao = observacao.trim()
    ? `\n📌 *Observação:* ${observacao}`
    : "";

  return `Olá! Quero fazer um pedido:\n\n${itensPedido}\n\n${endereco}${textoObservacao}\n\n🚀 *Total com desconto: R$ ${totalComDesconto.toFixed(2)}* \n\nAguardo a confirmação!`;
}
