import { Extra } from "@/types/Extras";
import { MenuItemType } from "@/types/MenuItemType";

export function formatarMensagem(
  cart: MenuItemType[],
  bairro: string,
  rua: string,
  casa: string,
  referencia: string,
  desconto: number,
  observacao: string
) {
  // Função auxiliar para calcular o total de um item (incluindo extras)
  const calcularTotalItem = (item: MenuItemType) => {
    const itemBaseTotal = item.price * item.quantity;
    
    // Calcular total dos extras
    const extrasTotal = item.extras && item.extras.length > 0
      ? item.extras.reduce((total: number, extra: Extra) => {
          return total + (extra.price * (extra.quantity || 1));
        }, 0)
      : 0;
    
    return itemBaseTotal + extrasTotal;
  };

  // Calculando o subtotal (soma de todos os itens com extras)
  const subtotal = cart.reduce((total, item) => {
    return total + calcularTotalItem(item);
  }, 0);
  
  // Aplicar desconto
  const totalComDesconto = subtotal * (1 - desconto/100);

  // Montando a mensagem dos itens
  const itensPedido = cart
    .map((item) => {
      const itemTotal = calcularTotalItem(item);
      const itemBaseTotal = item.price * item.quantity;
      
      // Construir a mensagem do item principal
      let mensagemItem = `🍽️ *${item.name}* - ${item.quantity}x (R$ ${itemBaseTotal.toFixed(2)})`;

      // Adicionar extras, se houver
      if (item.extras && item.extras.length > 0) {
        const extrasMensagem = item.extras
          .map((extra: Extra) => {
            const extraTotal = extra.price * (extra.quantity || 1);
            return `  ➕ *${extra.name}* - ${extra.quantity || 1}x (+R$ ${extraTotal.toFixed(2)})`;
          })
          .join("\n");

        mensagemItem += `\n${extrasMensagem}`;
        mensagemItem += `\n  📊 *Subtotal do item: R$ ${itemTotal.toFixed(2)}*`;
      }

      return mensagemItem;
    })
    .join("\n\n");

  // Formatando o endereço
  const endereco = `🏠 *Endereço de entrega:*\n📍 Bairro: ${bairro}\n📍 Rua: ${rua}\n🏡 Casa: ${casa}\n📝 Referência: ${referencia || "Nenhuma"}`;

  // Adiciona a observação se houver algo escrito
  const textoObservacao = observacao.trim()
    ? `\n📌 *Observação:* ${observacao}`
    : "";
    
  // Resumo do pedido
  const resumo = `💰 *Subtotal: R$ ${subtotal.toFixed(2)}*
${desconto > 0 ? `🏷️ *Desconto: R$ ${(subtotal * desconto/100).toFixed(2)}*` : ''}
🚀 *Total a pagar: R$ ${totalComDesconto.toFixed(2)}*`;

  return `Olá! Quero fazer um pedido:\n\n${itensPedido}\n\n${endereco}${textoObservacao}\n\n${resumo}\n\nAguardo a confirmação!`;
}