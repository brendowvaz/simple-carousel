export class Carousel {
    constructor(anterior, proximo, lista, navegacao, movimento) {
        this.anterior = document.querySelector(anterior);
        this.proximo = document.querySelector(proximo);
        this.lista = document.querySelector(lista);
        this.navegacao = document.querySelector(navegacao);
        this.movimento = document.querySelector(movimento);
        

        this.slides = this.getListaSlides();
        this.indicadores = this.getListaIndicadores();
        this.tamanhoSlide = this.getTamanhoSlide();
        
        this.indiceDoSlideAtual = 0;

        this.proximo.addEventListener('click', this.proximoSlide.bind(this));
        this.proximo.addEventListener('touchstart', this.proximoSlide.bind(this));

        this.anterior.addEventListener('click', this.slideAnterior.bind(this));
        this.anterior.addEventListener('touchstart', this.slideAnterior.bind(this));
        
        this.navegacao.addEventListener('click', this.pularParaSlide.bind(this));
        this.navegacao.addEventListener('touchstart', this.pularParaSlide.bind(this));
        

        this.movimento.addEventListener('mousedown', this.movimentoMouseInicio.bind(this), false);
        this.movimento.addEventListener('mouseup', this.movimentoMouseFinal.bind(this), false);
        this.movimento.addEventListener('touchstart', this.movimentoTouchInicio.bind(this), false);
        this.movimento.addEventListener('touchend', this.movimentoTouchFinal.bind(this), false);

        this.preparaSlides(this.tamanhoSlide);

        this.slideAutomatico();

    }

    getListaSlides() {
        return Array.from(this.lista.children);
    }

    getListaIndicadores() {
        return Array.from(this.navegacao.children);
    }

    getTamanhoSlide() {
        return this.slides[0].getBoundingClientRect().width;
    }

    getSlideAtual() {
        return this.slides[this.indiceDoSlideAtual];
    }

    getIndiceAtual() {
        return this.indicadores[this.indiceDoSlideAtual];
    }

    proximoSlide() {
        let proximaPosicao = this.indiceDoSlideAtual + 1;
        if(proximaPosicao > this.slides.length - 1) {
            proximaPosicao = 0;
        }

        this.vaParaSlide(proximaPosicao);
        this.pararSlideAutomatico();
    }

    slideAnterior() {
        let posicaoAnterior = this.indiceDoSlideAtual - 1;
        if(posicaoAnterior < 0) {
            posicaoAnterior = this.slides.length - 1;
        }

        this.vaParaSlide(posicaoAnterior);
        this.pararSlideAutomatico();
    }

    vaParaSlide(posicao) {
        const indicadorAtual = this.getIndiceAtual();
        this.indiceDoSlideAtual = posicao;
        const indicadorSelecionado = this.getIndiceAtual();

        this.scrollParaSlide(this.getSlideAtual());
        this.atualizaIndicadores(indicadorAtual, indicadorSelecionado);
    }

    scrollParaSlide(slideSelecionado) {
        this.lista.style.transform = 'translateX(-' + slideSelecionado.style.left + ')';
    }

    atualizaIndicadores(indicadorAtual, indicadorSelecionado) {
        indicadorAtual.classList.remove('carousel__indicador--ativo');

        indicadorSelecionado.classList.add('carousel__indicador--ativo');
    }

    pularParaSlide(evento) {
        if(evento.target === evento.currentTarget) return;

        const indicadorSelecionado = evento.target.getAttribute('data-indicador');
        this.vaParaSlide(parseInt(indicadorSelecionado));
        this.pararSlideAutomatico();
    }

    preparaSlides(tamanho) {
        this.slides.forEach((slide, i) => {
            slide.style.left = tamanho * i + 'px';
        })
    }

    slideAutomatico(){
        this.automatico = setInterval(this.proximoSlide.bind(this), 5000);
    }

    pararSlideAutomatico(){
        clearInterval(this.automatico);
        this.slideAutomatico();
    }

    movimentoMouseInicio(evento){
        this.mouseStartX = evento.pageX;
    }
    
    movimentoMouseFinal(evento){
        let mouseX = evento.pageX - this.mouseStartX;
        this.movimentaSlide(mouseX);
    }

    movimentoTouchInicio(evento) {
        evento.preventDefault();
        let touch = evento.changedTouches[0];
        this.touchStartX = touch.pageX;
    }
        
    movimentoTouchFinal(evento) {
        evento.preventDefault();
        let touch = evento.changedTouches[0];
        let touchX = touch.pageX - this.touchStartX;
        this.movimentaSlide(touchX);
    }

    movimentaSlide(movimento){
        if( movimento < -10 ) {
            this.proximoSlide();
        } else if( movimento > 10 ) {
            this.slideAnterior();
        }
    }

}

