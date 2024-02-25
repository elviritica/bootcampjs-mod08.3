import { Carta, Tablero, cartas } from "./modelo";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
export const barajarCartas = (cartas : Carta[]): Carta[] => {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;    
}


/*
Una carta se puede voltear:
- si no está encontrada y no está ya volteada, 
- si no hay dos cartas ya volteadas
*/
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    if(tablero.estadoPartida === "DosCartasLevantadas") {
        return false;
    }
    if(!tablero.cartas[indice].encontrada && !tablero.cartas[indice].estaVuelta) {  
        return true;
    } 

    return false;
}

export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    if (!sePuedeVoltearLaCarta(tablero, indice)) {
        return;
    }
    const cartaTablero = tablero.cartas[indice];
    const cartaArray = cartas.find((carta)=> carta.idFoto === cartaTablero.idFoto);

    if(cartaArray){
        cartaTablero.imagen = cartaArray.imagen;
        cartaTablero.estaVuelta=true;
    }
}

/*
Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (tablero: Tablero, indiceA: number, indiceB: number, ): boolean => {
    const cartaA = tablero.cartas[indiceA];
    const cartaB = tablero.cartas[indiceB];

    if(cartaA.idFoto !== cartaB.idFoto){
        return false;  
    }

    return true;
}

/*
Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas 
y comprobar si la partida esta completa.
*/
export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceB].encontrada = true;
    tablero.cartas[indiceA].estaVuelta = true;
    tablero.cartas[indiceB].estaVuelta = true;

    tablero.estadoPartida = "CeroCartasLevantadas";

}

/*
Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
    tablero.cartas[indiceA].encontrada = false;
    tablero.cartas[indiceB].encontrada = false;
    tablero.cartas[indiceA].estaVuelta = false;
    tablero.cartas[indiceB].estaVuelta = false;

    tablero.estadoPartida = "CeroCartasLevantadas";

}



/*
Esto lo podemos comprobar o bien utilizando every, o bien utilizando un 
contador (cartasEncontradas)
*/
export const esPartidaCompleta = (tablero: Tablero): boolean => {
    return tablero.cartas.every((carta) => carta.encontrada);


};


/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
    tablero.cartas = barajarCartas([...tablero.cartas]);
    
    tablero.cartas.forEach((carta) => {
        carta.estaVuelta = false;
        carta.encontrada = false;
    })
    tablero.estadoPartida = "CeroCartasLevantadas";
};




