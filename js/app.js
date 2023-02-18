//Función de utilidad

const $ = (selector) => document.querySelector(selector);

const $botonEmpezarJuego = $(".empezar");
const $pilaInicial = $("#pila-inicial");

const mazo = [];
let barajado = [];
let pilas = [];

const tipos = ["corazones", "diamantes", "trebol", "pica"];
const colores = {
    corazones: "rojo",
    diamantes: "rojo",
    trebol: "negro",
    pica: "negro"
};

// Funciones para crear el juego
const crearMazo = () => {
    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < tipos.length; j++) {
            const carta = {
                numero: i,
                color: colores[tipos[j]],
                tipo: tipos[j],
                img: `assets/${i}-${tipos[j]}.png`,
                estaDadaVuelta: true,
            }
            mazo.push(carta) 
        }
    }
};

const barajarMazo = () => {
    barajado = mazo.map(carta => ({carta, sort: Math.random()}))
    .sort((a,b) => a.sort - b.sort)
    .map(({carta}) => carta)
};

const servir = () => {
    for (let i = 0; i < 7; i++) {
        pilas.push([])
        for (let j = 0; j < i + 1; j++) {
            const primeraCartaDeBarajado = barajado[0];
            barajado.shift()
            pilas[i].push(primeraCartaDeBarajado)
        }    
    }
};

const crearCartaEnHTML = (carta) => {
    const cartaHTML = document.createElement("div")
    const imagen = document.createElement("img")

    if (carta.estaDadaVuelta) {
        imagen.src ="assets/dorso.png"
    } else {
        imagen.src = carta.img
    }
    cartaHTML.classList.add("carta")
    cartaHTML.appendChild(imagen)
    return cartaHTML
};

const ponerCartasEnLaPilaInicial = () => {
    for (let i = 0; i < barajado.length; i++) {
        const carta = barajado[i];
        const cartaHTML = crearCartaEnHTML(carta)
        $pilaInicial.appendChild(cartaHTML)
    }
};

const ponerCartasEnLasPilas = () => {
    for (let i = 0; i < pilas.length; i++) {
        const pila = document.querySelector(`#pila-${i}`);
        for (let j = 0; j < pilas[i].length; j++) {
            const esLaUltimaCartaDeLaPila = j === pilas[i].length -1 
            const carta = pilas[i][j];
            if (esLaUltimaCartaDeLaPila) {
                carta.estaDadaVuelta = false
            }
            const cartaHTML = crearCartaEnHTML(carta)
            cartaHTML.style.top = `${j * 35}px`
            pila.appendChild(cartaHTML)
        }
    }
};

$botonEmpezarJuego.onclick = () => {
    crearMazo()
    barajarMazo()
    servir()
    ponerCartasEnLasPilas()
    ponerCartasEnLaPilaInicial()
}; 