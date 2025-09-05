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

  link.addEventListener('mouseleave', () => {
    clearTimeout(bgTimeout);
    document.body.style.backgroundImage = "linear-gradient(var(--bg-overlay), var(--bg-overlay)), url('imagens/background.jpg')";
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.img-contato');
  if (images.length === 0) return;

  let currentIndex = 0;
  images[currentIndex].classList.add('active');

  if (images.length === 1) return;

  setInterval(() => {
    images[currentIndex].classList.remove('active');
    
    currentIndex = (currentIndex + 1) % images.length;
    
    setTimeout(() => {
      images[currentIndex].classList.add('active');
    }, 500); 
  }, 5000); 
});

// Menu hambúrguer
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  const backdrop = document.createElement('div');
  backdrop.classList.add('menu-backdrop');
  document.body.appendChild(backdrop);
  
  function toggleMenu() {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
    backdrop.classList.toggle('active');
    
    if (menu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  menuToggle.addEventListener('click', toggleMenu);
  
  backdrop.addEventListener('click', toggleMenu);
  
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (menu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
  
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && menu.classList.contains('active')) {
      toggleMenu();
    }
  });
});

function centralizarHome() {
  const homeMenu = document.querySelector('.home-menu');
  const alturaTela = window.innerHeight;
  const alturaMenu = homeMenu.offsetHeight;

  // distância do topo para centralizar
  const margemTop = (alturaTela - alturaMenu) / 3;
  homeMenu.style.marginTop = `${margemTop}px`;
}

// executa no carregamento e ao redimensionar a tela
window.addEventListener('load', centralizarHome);
window.addEventListener('resize', centralizarHome);


//parte das descrições da pizza
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cardapio-brota .info h3').forEach(h3 => {
      const descricao = h3.parentElement.querySelector('p');

      if (descricao) {
        h3.addEventListener('mouseenter', () => {
          descricao.style.display = 'block';
          requestAnimationFrame(() => {
            descricao.style.opacity = '1';
          });
        });

        h3.addEventListener('mouseleave', () => {
          descricao.style.opacity = '0';
          setTimeout(() => {
            descricao.style.display = 'none';
          }, 300);
        });
      }
    });
  });

