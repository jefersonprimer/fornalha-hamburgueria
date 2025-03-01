import { Extra } from "@/types/Extras";
import { MenuItemType } from "@/types/MenuItemType";

export function formatarMensagem(
  cart: MenuItemType[],  // Usar CartItem em vez de any[]
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
      let price = item.price; // Garantir que price é um number

      if (isNaN(price)) price = 0;
      let itemTotal = price * item.quantity;

      // Adicionar o preço dos extras, se houver
      if (item.extras && item.extras.length > 0) {
        const extrasTotal = item.extras.reduce((extraTotal: number, extra: Extra) => {
          let extraPrice = extra.price; // Garantir que extraPrice é um number

          if (isNaN(extraPrice)) extraPrice = 0;
          
          return extraTotal + extraPrice * extra.quantity; // Multiplica pela quantidade do extra
        }, 0);

        itemTotal += extrasTotal; // Soma o valor dos extras ao item principal
      }

      return total + itemTotal;
    }, 0) * (1 - desconto);

  // Montando a mensagem dos itens
  const itensPedido = cart
    .map((item) => {
      let price = item.price; // Garantir que price é um number

      if (isNaN(price)) price = 0;
      const totalPrice = price * item.quantity;

      // Construir a mensagem do item principal
      let mensagemItem = `🍽️ *${item.name}* - ${item.quantity}x (R$ ${totalPrice.toFixed(2)})`;

      // Adicionar extras, se houver
      if (item.extras && item.extras.length > 0) {
        const extrasMensagem = item.extras
          .map((extra: Extra) => {
            let extraPrice = extra.price; // Garantir que extraPrice é um number

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
