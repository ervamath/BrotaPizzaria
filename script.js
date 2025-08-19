// Pega os elementos do HTML
const botao = document.getElementById("botaoClique");
const mensagem = document.getElementById("mensagem");

// Adiciona evento de clique
botao.addEventListener("click", () => {
  mensagem.innerText = "Você clicou no botão! 🚀";
});