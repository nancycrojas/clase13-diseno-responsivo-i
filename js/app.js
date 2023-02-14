//Función de utilidad

const $ = (selector) => document.querySelector(selector);

const $botonEmpezarJuego = $(".empezar");

const mazo = [];
let barajado = [];
let pilas = [];

const tipos = ["corazones", "diamante", "trebol", "pica"];
const colores = {
    corazones: "rojo",
    diamante: "rojo",
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
                img: `${i}-${tipos[j]}`
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
console.log(barajado);
console.log(pilas);
}

$botonEmpezarJuego.onclick = () => {
    crearMazo()
    barajarMazo()
    servir()
}; 