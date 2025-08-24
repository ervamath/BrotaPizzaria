const links = document.querySelectorAll('.menu a[href^="#"]');
const secoes = document.querySelectorAll('.secao');
const home = document.querySelector('.home');
const homeLinks = document.querySelectorAll('.home-menu a');

function showSection(id) {
  // Esconde todas
  secoes.forEach(secao => secao.classList.remove('ativa'));
  // Mostra a escolhida
  const alvo = document.getElementById(id);
  if (alvo) alvo.classList.add('ativa');

  // Menu ativo
  links.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === `#${id}`));
}

// Clique no menu (sem recarregar)
links.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      // Atualiza a URL (sem recarregar) e mostra seção
      history.pushState(null, '', href);
      showSection(id);
    }
  });
});

// Troca seção ao usar voltar/avançar do navegador
window.addEventListener('popstate', () => {
  const id = (location.hash || '#home').replace('#', '');
  showSection(id);
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  const id = (location.hash || '#home').replace('#', '');
  showSection(id);
});

let bgTimeout; // para controlar o timeout

homeLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const bg = link.getAttribute('data-bg');
    if (bg) {
      bgTimeout = setTimeout(() => {
        document.body.style.backgroundImage = `linear-gradient(var(--bg-overlay), var(--bg-overlay)), url('${bg}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      }, 300);
    }
  });

  //Controla o tempo para evitar mudanças rápidas e volta ao fundo original
  link.addEventListener('mouseleave', () => {
    clearTimeout(bgTimeout);
    document.body.style.backgroundImage = "linear-gradient(var(--bg-overlay), var(--bg-overlay)), url('imagens/background.jpg')";
  });
});