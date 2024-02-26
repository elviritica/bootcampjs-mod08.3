import { Tablero, tablero } from "./modelo";
import { cambiarEstadoPartida, iniciaPartida, parejaEncontrada, parejaNoEncontrada, sonPareja, voltearLaCarta } from "./motor";


export function iniciarPartidaUI(tablero:Tablero){
    iniciaPartida(tablero);
    pintarTablero(tablero);
}

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
    contenedor.src = "/src/images/carta-detras-rosa.png";
    contenedor.alt = "Carta";
    return contenedor;
};

export function pintarTablero (tablero : Tablero){

    const contenedorCartas = document.getElementById('contenedor-cartas');

    if(contenedorCartas && contenedorCartas instanceof HTMLDivElement){
        tablero.cartas.forEach((carta)=>{
            let index = carta.idFoto;
            let posicion = tablero.cartas.indexOf(carta);

            const divCarta = crearContenedor("divCarta");
            divCarta.setAttribute("data-indice", index.toString());
            
            const imgCarta = crearContenedorImg("carta");
            imgCarta.setAttribute("data-indice-imagen", index.toString());

            imgCarta.addEventListener("click", () => {
                handleClickCarta(posicion);
                
            });

            divCarta.appendChild(imgCarta);
            contenedorCartas.appendChild(divCarta);
        })
    };
}


/*
En cuanto el usuario pinche en una carta:

Miramos si la carta es volteable (ver motor).
Si es volteable la voltearemos (cambiamos el src de la imagen), para la imagen sería recomendable crear data-indice-imagen, va a coincidir con el índice del div para pintar la imagen correspondiente al índice del array de cartas.
Comprobamos si estamos elegiendo una carta o estamos en la segunda.
Si estamos en la segunda comprobamos si son pareja o no.
En caso de que si las dejamos fijas.
En caso de que no esperamos un segundo (setTimeout) y las ponemos boca abajo (reseteamos su estado sin voltear)
Vuelta a empezar

*/
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
                            cartaVolteadaA.src = "/src/images/carta-detras-rosa.png";
                            cartaVolteadaB.src = "/src/images/carta-detras-rosa.png";
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