export const validarEndereco = (bairro: string, rua: string, casa: string) => {
    if (!bairro || !rua || !casa) {
      alert("Por favor, preencha todos os campos do endereço!");
      return false;
    }
    return true;
  };
  