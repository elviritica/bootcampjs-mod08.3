export interface Carta {
    idFoto: number; // id del 1 al 6 para 12 cartas, se repete 2 veces en el array de cartas 
    imagen: string; // por comodidad repetimos la url de la imagen
    estaVuelta: boolean;
    encontrada: boolean;
}

export interface InfoCarta {
    idFoto: number;
    imagen: string;
}

const infoCartas : InfoCarta[] = [
    {idFoto: 1, imagen: "./src/images/Abeja.png"},
    {idFoto: 2, imagen: "./src/images/Buho.png"},
    {idFoto: 3, imagen: "./src/images/Cerdo.png"},
    {idFoto: 4, imagen: "./src/images/Pollo.png"},
    {idFoto: 5, imagen: "./src/images/Leon.png"},
    {idFoto: 6, imagen: "./src/images/Perro.png"},
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
    idFoto,
    imagen,
    estaVuelta: false,
    encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
    /* Aquí crearemos un array de cartas a partir de un array de infoCartas
        y duplicaremos las cartas para que haya dos de cada tipo.
    */
    const coleccionDeCartas: Carta[] = infoCartas.flatMap(carta => [
        crearCartaInicial(carta.idFoto, carta.imagen),
        crearCartaInicial(carta.idFoto, carta.imagen)
    ]);

    return coleccionDeCartas;

};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

/*
Aquí definimos el tipo de estado de la partida, 
la idea es que cuando empiece la partida todas las cartas 
estén boca abajo y si se hacen click sobre ellas no se volteen.

EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar 
partida el estado de la partida cambiaría a "CeroCartasLevantadas" y 
así sucesivamente.
*/

export type EstadoPartida =
    | "PartidaNoIniciada"
    | "CeroCartasLevantadas"
    | "UnaCartaLevantada"
    | "DosCartasLevantadas"
    | "PartidaCompleta";

export interface Tablero {
    cartas: Carta[];
    estadoPartida: EstadoPartida;
    indiceCartaVolteadaA?: number;
    indiceCartaVolteadaB?: number;
}

export const crearTableroInicial = (cartas: Carta[]): Tablero => ({
    cartas: cartas,
    estadoPartida: "PartidaNoIniciada",
});

export let tablero: Tablero = crearTableroInicial(cartas);