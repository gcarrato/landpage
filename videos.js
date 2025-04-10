
document.querySelectorAll('.carrossel-wrapper').forEach(wrapper => {
  const faixa = wrapper.querySelector('.faixa-carrossel');
  const btnAnterior = wrapper.querySelector('.botao-carrossel.anterior');
  const btnProximo = wrapper.querySelector('.botao-carrossel.proximo');
  const items = wrapper.querySelectorAll('.item-video');
  const total = items.length;
  let indice = 0;

  const atualizarCarrossel = () => {
    faixa.style.transform = `translateX(-${indice * 100}%)`;
  };

  btnProximo.addEventListener('click', () => {
    if (indice < total - 1) {
      indice++;
      atualizarCarrossel();
    }
  });

  btnAnterior.addEventListener('click', () => {
    if (indice > 0) {
      indice--;
      atualizarCarrossel();
    }
  });
});

