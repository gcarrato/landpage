// Inicializa carrosséis
document.querySelectorAll('.carrossel-wrapper').forEach(wrapper => {
    const faixa = wrapper.querySelector('.faixa-carrossel');
    const btnAnterior = wrapper.querySelector('.botao-carrossel.anterior');
    const btnProximo = wrapper.querySelector('.botao-carrossel.proximo');
    const videos = wrapper.querySelectorAll('video');
    const total = videos.length;
    let indice = 0;
  
    btnProximo.addEventListener('click', () => {
      indice = (indice + 1) % total;
      faixa.style.transform = `translateX(-${indice * 100}%)`;
      pausarTodosVideos();
    });
  
    btnAnterior.addEventListener('click', () => {
      indice = (indice - 1 + total) % total;
      faixa.style.transform = `translateX(-${indice * 100}%)`;
      pausarTodosVideos();
    });
  
    // Adiciona evento para pausar vídeos de outros carrosséis
    videos.forEach(video => {
      video.addEventListener('play', () => {
        pausarTodosVideos(video);
      });
    });
  });
  
  // Função global para pausar todos os vídeos exceto o atual (se passado)
  function pausarTodosVideos(videoAtivo = null) {
    document.querySelectorAll('video').forEach(video => {
      if (video !== videoAtivo) {
        video.pause();
      }
    });
  }