import { Carta, Tablero, tablero, cartas } from "./modelo";
import { iniciaPartida, voltearLaCarta } from "./motor";

const crearContenedor = (nombreClase: string): HTMLDivElement => {
    const contenedor = document.createElement("div");
    contenedor.classList.add(nombreClase);
    contenedor.id = nombreClase;
    return contenedor;
};

const crearContenedorImg = (nombreClase: string): HTMLImageElement => {
    const contenedor = document.createElement("img");
    contenedor.classList.add(nombreClase);
    contenedor.id = nombreClase;
    contenedor.src = "/src/images/carta-detras-rosa.png";
    contenedor.alt = "Carta";
    return contenedor;
};

export const iniciaPartidaUI = (tablero : Tablero) : void => {
    iniciaPartida(tablero);
    pintarTablero(tablero);
}

export function pintarTablero(tablero : Tablero){
    const cartas = tablero.cartas;
    //Obtener el div ppal
    const contenedorCartas = document.getElementById("contenedor-cartas") as HTMLDivElement;

    cartas.forEach((carta) => {
        let index = carta.idFoto;
        //Comprobar que el div ppal existe
        if(contenedorCartas && contenedorCartas instanceof HTMLDivElement){
            //Crear el div de la carta
            const divCarta = crearContenedor("divCarta");
            //Añadir el atributo data-indice según el idFoto de la carta
            divCarta.setAttribute("data-indice", index.toString());
            //Añadir el div de la carta al div ppal
            contenedorCartas.appendChild(divCarta);
            //Crear la img 
            const imgCarta = crearContenedorImg("carta");
            //Añadir el atributo data-indice según el idFoto de la carta
            imgCarta.setAttribute("data-indice", index.toString());
            //Añadir el div de la imagen al div de la carta
            divCarta.appendChild(imgCarta);
            
        }
    })

    // Obtener todos los divs con la clase divCarta
    const divsCartas = document.querySelectorAll(".divCarta");

    divsCartas.forEach((divCarta) => {
        divCarta.addEventListener("click", () => {
            // Obtener todos los img dentro de los divs
            const imgCarta = divCarta.querySelector("img") as HTMLImageElement;

            // Obtener el índice de la carta desde el atributo data-indice del div
            const indiceCartaAtributo = divCarta.getAttribute("data-indice");

            if(indiceCartaAtributo !== null){
                //Pasar el índice a Int para poder hacer la comprobación más adelante
                const indiceCarta = parseInt(indiceCartaAtributo);

                // Encontrar la carta correspondiente en el array de cartas usando el índice obtenido
                const cartaEncontrada = cartas.find((carta) => carta.idFoto === indiceCarta);

                // Obtener la ruta de la imagen de la carta encontrada
                if(cartaEncontrada){
                    voltearLaCarta(tablero, indiceCarta);
                }                
            }
            
        });
    });
}