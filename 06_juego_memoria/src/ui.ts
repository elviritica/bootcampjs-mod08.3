import { REVERSO_CARTA, Tablero, tablero } from "./modelo";
import { cambiarEstadoPartida, iniciaPartida, parejaEncontrada, parejaNoEncontrada, sonPareja, voltearLaCarta } from "./motor";

export const botonIniciar = document.getElementById("boton-iniciar") as HTMLButtonElement;

export function iniciarPartidaUI(tablero:Tablero){
    iniciaPartida(tablero);
    pintarTablero(tablero);
    muestraPuntos()
}

botonIniciar.addEventListener("click", () => {
    window.location.reload();
});

let idContadorA = 0;
let idContadorB = 0;

const crearContenedor = (nombreClase: string): HTMLDivElement => {
    const contenedor = document.createElement("div");
    contenedor.classList.add(nombreClase);
    contenedor.id = nombreClase + idContadorA++;
    return contenedor;
};

const crearContenedorImg = (nombreClase: string): HTMLImageElement => {
    const contenedor = document.createElement("img");
    contenedor.classList.add(nombreClase);
    contenedor.id = nombreClase + idContadorB++;
    contenedor.src = REVERSO_CARTA;
    contenedor.alt = "Carta";
    return contenedor;
};

let contadorTurnos = 0;
let esPrimerClick = true;

export function contadorTurnosUI() {
    if (!esPrimerClick) {
        contadorTurnos++;
    }
    esPrimerClick = !esPrimerClick;
}

export function muestraPuntos(){
    const turnos = document.getElementById("contador-turnos") as HTMLDivElement;
    if (turnos) {
        turnos.innerHTML = contadorTurnos.toString();
    }
}

export function pintarTablero (tablero : Tablero){

    const contenedorCartas = document.getElementById('contenedor-cartas');

    if(contenedorCartas && contenedorCartas instanceof HTMLDivElement){
        while (contenedorCartas.firstChild) {
            contenedorCartas.removeChild(contenedorCartas.firstChild);
        }

        tablero.cartas.forEach((carta)=>{
            let index = carta.idFoto;
            let posicion = tablero.cartas.indexOf(carta);

            const divCarta = crearContenedor("divCarta");
            divCarta.setAttribute("data-indice", index.toString());
            
            const imgCarta = crearContenedorImg("carta");
            imgCarta.setAttribute("data-indice-imagen", index.toString());

            imgCarta.addEventListener("click", () => {
                //que no cuente puntos si la carta está vuelta
                if(!carta.estaVuelta) {
                contadorTurnosUI();
                handleClickCarta(posicion);
                muestraPuntos();
                } else {
                    alert('Esta carta ya está vuelta, ¡prueba con otra!'); 
                }


            });

            divCarta.appendChild(imgCarta);
            contenedorCartas.appendChild(divCarta);
        })
    };
}


export function handleClickCarta(indice: number) {
    const cartaSeleccionada = document.getElementById(`carta${indice}`) as HTMLImageElement;

    // Voltea la carta si es posible
    voltearLaCarta(tablero, indice);

    // Si la carta se volteó, actualiza la imagen y el estado del juego
    if (tablero.cartas[indice].estaVuelta) {
        cartaSeleccionada.src = tablero.cartas[indice].imagen;

        if (tablero.estadoPartida === "CeroCartasLevantadas") {
            tablero.indiceCartaVolteadaA = indice;
            cambiarEstadoPartida(tablero);
        } else if (tablero.estadoPartida === "UnaCartaLevantada") {
            tablero.indiceCartaVolteadaB = indice;
            cambiarEstadoPartida(tablero);

            // Comprueba si las dos cartas forman pareja
            if(tablero.indiceCartaVolteadaA !== undefined && tablero.indiceCartaVolteadaB !== undefined){
                if (sonPareja(tablero, tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB)) {
                    // Si son pareja, las deja fijas y restablece el estado del juego
                    parejaEncontrada(tablero, tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB);
                    tablero.indiceCartaVolteadaA = undefined;
                    tablero.indiceCartaVolteadaB = undefined;
                    cambiarEstadoPartida(tablero);

                } else {
                    // Si no son pareja, espera un segundo y luego las voltea de nuevo                    
                    setTimeout(() => {
                        if (tablero.indiceCartaVolteadaA !== undefined && tablero.indiceCartaVolteadaB !== undefined) {
                            parejaNoEncontrada(tablero, tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB);
                            const cartaVolteadaA = document.getElementById(`carta${tablero.indiceCartaVolteadaA}`) as HTMLImageElement;
                            const cartaVolteadaB = document.getElementById(`carta${tablero.indiceCartaVolteadaB}`) as HTMLImageElement;
                            cartaVolteadaA.src = REVERSO_CARTA;
                            cartaVolteadaB.src = REVERSO_CARTA;
                            tablero.indiceCartaVolteadaA = undefined;
                            tablero.indiceCartaVolteadaB = undefined;
                            cambiarEstadoPartida(tablero);

                        }
                }, 1000);
                    
                }
            }
        }
    }
}