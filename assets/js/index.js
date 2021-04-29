import { Carousel } from "./carousel.js"

const anterior = '[data-anterior]';
const proximo = '[data-proximo]';
const lista = '[data-lista]';
const navegacao = '[data-navegacao]';
const movimento = '[data-touch]';

const novoCarousel = new Carousel(anterior, proximo, lista, navegacao, movimento);

//Corrige o tamanho do slide caso a tela seja redimensionada
window.onresize = () => {
    novoCarousel.preparaSlides(document.querySelector(movimento).getBoundingClientRect().width);
    novoCarousel.vaParaSlide(novoCarousel.indiceDoSlideAtual);
}