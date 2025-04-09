let players = [];

function onYouTubeIframeAPIReady() {
  document.querySelectorAll('.item-video iframe').forEach((iframe) => {
    const wrapper = iframe.closest('.carrossel-wrapper');
    const carrosselId = wrapper.dataset.id;

    const player = new YT.Player(iframe, {
      events: {
        'onStateChange': (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            pausarVideosDeOutrosCarrosseis(player, carrosselId);
          }
        }
      }
    });

    players.push({ player, carrosselId });
  });

  iniciarCarrosseis();
}

function iniciarCarrosseis() {
  document.querySelectorAll('.carrossel-wrapper').forEach(wrapper => {
    const faixa = wrapper.querySelector('.faixa-carrossel');
    const btnAnterior = wrapper.querySelector('.botao-carrossel.anterior');
    const btnProximo = wrapper.querySelector('.botao-carrossel.proximo');
    const items = wrapper.querySelectorAll('.item-video');
    const total = items.length;
    let indice = 0;

    const atualizarPosicao = () => {
      faixa.style.transform = `translateX(-${indice * 100}%)`;
      pausarTodosVideos();
    };

    btnProximo.addEventListener('click', () => {
      if (indice < total - 1) {
        indice++;
        atualizarPosicao();
      }
    });

    btnAnterior.addEventListener('click', () => {
      if (indice > 0) {
        indice--;
        atualizarPosicao();
      }
    });
  });
}

function pausarTodosVideos(videoAtivo = null) {
  players.forEach(({ player }) => {
    if (player !== videoAtivo) {
      player.pauseVideo();
    }
  });
}

function pausarVideosDeOutrosCarrosseis(videoAtivo, carrosselAtual) {
  players.forEach(({ player, carrosselId }) => {
    if (player !== videoAtivo && carrosselId !== carrosselAtual) {
      player.pauseVideo();
    }
  });
}