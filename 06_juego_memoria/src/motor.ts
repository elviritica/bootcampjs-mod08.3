import { Carta, EstadoPartida, Tablero, cartas, crearTableroInicial } from "./modelo"

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
const barajarCartas = (cartas : Carta[]): Carta[] => {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;    
}

const cambiarEstadoPartida = (tablero: Tablero): EstadoPartida => {
    let estado : EstadoPartida = "PartidaNoIniciada";
    let cartasLevantadas = 0;
    let cartasEncontradas = 0;

    tablero.cartas.forEach((carta) => {if(carta.estaVuelta){cartasLevantadas++}});
    tablero.cartas.forEach((carta) => {if(carta.encontrada){cartasEncontradas+2}});

    if(cartasLevantadas === 0){
        estado = "CeroCartasLevantadas"
    } else if (cartasLevantadas === 1) {
        estado = "UnaCartaLevantada"
    } else if (cartasLevantadas === 2) {
        estado = "DosCartasLevantadas"
    } else if (cartasEncontradas === 12) {
        estado = "PartidaCompleta"
    }

    return estado;
        
}

/*
Una carta se puede voltear:
- si no está encontrada y no está ya volteada, 
- si no hay dos cartas ya volteadas
*/
const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    if((!tablero.cartas[indice].encontrada && !tablero.cartas[indice].estaVuelta)
        && tablero.estadoPartida !== "DosCartasLevantadas"){
        
        return true;
    } 
    return false;
}

export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    
    const cartaReves : Carta = tablero.cartas[indice];
    const cartaDerecho : Carta = cartas[indice];

    if(cartaReves.idFoto === cartaDerecho.idFoto){
        cartaReves.imagen = cartaDerecho.imagen;
    }
}

/*
Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    const cartaA = tablero.cartas[indiceA];
    const cartaB = tablero.cartas[indiceB];

    if (cartaA.idFoto !== cartaB.idFoto) {
        return false; 
    }

    if (!cartaA.estaVuelta || !cartaB.estaVuelta) {
        return false; 
    }

    return true;
}

/*
Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas 
y comprobar si la partida esta completa.
*/
const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceB].encontrada = true;
    cambiarEstadoPartida(tablero);

}

/*
Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
    tablero.cartas[indiceA].estaVuelta = false;
    tablero.cartas[indiceB].estaVuelta = false;
}


/*
Esto lo podemos comprobar o bien utilizando every, o bien utilizando un 
contador (cartasEncontradas)
*/
export const esPartidaCompleta = (tablero: Tablero) : boolean => {
    tablero.cartas.every((carta) => {
        if (carta.encontrada === true && carta.estaVuelta === true) {
            return true;
    }});

    return false;
}


/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
    tablero.cartas = barajarCartas(tablero.cartas);

    
    tablero.cartas.forEach((carta) => {
        carta.estaVuelta = false;
        carta.encontrada = false;
    })
    cambiarEstadoPartida(tablero);
};