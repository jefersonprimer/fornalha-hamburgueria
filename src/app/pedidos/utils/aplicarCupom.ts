export const aplicarCupom = (cupom: string, setDesconto: (desconto: number) => void) => {
    if (cupom === "DESCONTO10") {
      setDesconto(0.1);
      alert("Cupom de desconto aplicado com sucesso!");
    } else {
      alert("Cupom inválido.");
      setDesconto(0);
    }
  };
  