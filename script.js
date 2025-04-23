let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImages;  // Incrementa o índice e faz loop
    updateCarousel();
}

function updateCarousel() {
    const offset = -currentIndex * 100;  // Ajusta o offset para a nova imagem
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

// Inicializa o auto-play
setInterval(nextSlide, 3000); // Muda a imagem a cada 3 segundos

// Função para o menu hamburguer
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('.menu').classList.remove('active');
    }
});


document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const alvo = document.querySelector(this.getAttribute('href'));
  
      if (alvo) {
        const headerOffset = 120; // ← Altere esse valor conforme a altura do seu cabeçalho
        const posicao = alvo.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        document.querySelector('.menu').classList.remove('active');
        window.scrollTo({
          top: posicao,
          behavior: 'smooth'
        });
      }
    });
  });

