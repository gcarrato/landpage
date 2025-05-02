function Menu(config){
    this.nav = ( typeof config.container === 'string') ? document.querySelector(config.container) : config.container;
    this.btn = ( typeof config.toggleBtn === 'string') ? document.querySelector(config.toggleBtn) : config.toggleBtn;
    this.maxWidth = config.widthEnabled || false;

    var _opened = false;
    var _this = this;

    this.btn.removeAttribute('style');

    if(this.maxWidth){
        window.addEventListener('resize', e => {
            if(window.innerWidth > _this.maxWidth){
                _this.nav.removeAttribute('style');
                _opened = true;
            } else if(!_this.nav.getAttribute('style')){
                closeMenu();
            }
        });

        if(window.innerWidth <= _this.maxWidth){
            closeMenu();
        }
    }

    this.btn.addEventListener('click', openOrClose);

    function openOrClose(){
        if(!_opened){
            openMenu();
        } else {
            closeMenu();
        }
    }

    function openMenu(){
        var _top = _this.nav.getBoundingClientRect().top + 'px';

        var _style = {
            maxHeight: 'calc(100vh - '+ _top +' )',
            overflow: 'hidden'
        };

        applyStyleToNav(_style);
        _opened = true;
    }

    function applyStyleToNav(_style){
        Object.keys(_style).forEach(stl => {
            _this.nav.style[stl] = _style[stl];
        });
    }

    function closeMenu(){
        var _style = {
            maxHeight: '0px',
            overflow: 'hidden'
        };

        applyStyleToNav(_style);
        _opened = false;
    }

    // ⬇️ ADAPTADO: rolagem suave + recolhimento do menu
    document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const alvo = document.querySelector(this.getAttribute('href'));

            if (alvo) {
                const headerOffset = 120; // ajuste conforme sua necessidade
                const posicao = alvo.getBoundingClientRect().top + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: posicao,
                    behavior: 'smooth'
                });

                // Fecha o menu após clicar
                if (window.innerWidth <= _this.maxWidth) {
                    closeMenu();
                }
            }
        });
    });
}
