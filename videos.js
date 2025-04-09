let players = []; // lista com todos os players do site

// Função chamada automaticamente pela API do YouTube
function onYouTubeIframeAPIReady() {
  document.querySelectorAll('.item-video iframe').forEach((iframe, index) => {
    const carrosselWrapper = iframe.closest('.carrossel-wrapper');
    const carrosselId = carrosselWrapper.dataset.id;

    const player = new YT.Player(iframe, {
      events: {
        'onStateChange': event => {
          if (event.data === YT.PlayerState.PLAYING) {
            pausarVideosDeOutrosCarrosseis(player, carrosselId);
          }
        }
      }
    });

    // Salva player e a qual carrossel ele pertence
    players.push({ player, carrosselId });
  });

  iniciarCarrosseis(); // Inicializa os botões
}

// Inicializa carrosséis
function iniciarCarrosseis() {
  document.querySelectorAll('.carrossel-wrapper').forEach(wrapper => {
    const faixa = wrapper.querySelector('.faixa-carrossel');
    const btnAnterior = wrapper.querySelector('.botao-carrossel.anterior');
    const btnProximo = wrapper.querySelector('.botao-carrossel.proximo');
    const items = wrapper.querySelectorAll('.item-video');
    const total = items.length;
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
  });
}

// Pausa todos os players, ou todos menos o ativo
function pausarTodosVideos(videoAtivo = null) {
  players.forEach(({ player }) => {
    if (player !== videoAtivo) {
      player.pauseVideo();
    }
  });
}

// Pausa apenas os vídeos de carrosséis diferentes
function pausarVideosDeOutrosCarrosseis(videoAtivo, carrosselAtual) {
  players.forEach(({ player, carrosselId }) => {
    if (player !== videoAtivo && carrosselId !== carrosselAtual) {
      player.pauseVideo();
    }
  });
}
