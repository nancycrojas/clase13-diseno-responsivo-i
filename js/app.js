//Función de utilidad

const $ = (selector) => document.querySelector(selector);

const $botonEmpezarJuego = $(".empezar");
const $pilaInicial = $("#pila-inicial");

let mazo = [];
let barajado = [];
let pilas = [];
let primeraCartaCliqueada = null;

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
    barajado = mazo
    .map(carta => ({carta, sort: Math.random()}))
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
    cartaHTML.dataset.numero = carta.numero
    cartaHTML.dataset.color = carta.color
    cartaHTML.dataset.tipo = carta.tipo

    cartaHTML.classList.add("carta");
    cartaHTML.appendChild(imagen);
    cartaHTML.onclick = () => {
        comprobarClickEnCarta(cartaHTML)
    }
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
        pila.innerHTML = "";
        for (let j = 0; j < pilas[i].length; j++) {
            const esLaUltimaCartaDeLaPila = j === pilas[i].length -1 
            const carta = pilas[i][j];
            if (esLaUltimaCartaDeLaPila) {
                carta.estaDadaVuelta = false
            }
            const cartaHTML = crearCartaEnHTML(carta)
            cartaHTML.dataset.pila = i
            cartaHTML.style.top = `${j * 35}px`
            pila.appendChild(cartaHTML)
        }
    }
};

const comprobarClickEnCarta = (carta) => {
    if(primeraCartaCliqueada) {
        const segundaCartaCliqueada = carta;
        if(primeraCartaCliqueada.dataset.numero == segundaCartaCliqueada.dataset.numero - 1 && primeraCartaCliqueada.dataset.color !== segundaCartaCliqueada.dataset.color) {
            const pilaDeLaPrimeraCarta = pilas[Number(primeraCartaCliqueada.dataset.pila)]
            const pilaDeLaSegundaCarta = pilas[Number(segundaCartaCliqueada.dataset.pila)]
            
            const primeraCartaObjeto = pilaDeLaPrimeraCarta.pop();
            pilaDeLaSegundaCarta.push(primeraCartaObjeto);

            ponerCartasEnLasPilas()

        }else {
            alert("no se pueden mover :(")
        }
    }else {
        primeraCartaCliqueada = carta
        carta.style.border = "2px solid red"
    }
}

$botonEmpezarJuego.onclick = () => {
    mazo = [];
    barajado = [];
    pilas = [];

    crearMazo()
    barajarMazo()
    servir()
    ponerCartasEnLasPilas()
    ponerCartasEnLaPilaInicial()  
}; 