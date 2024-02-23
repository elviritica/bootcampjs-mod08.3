import "./style.css";
import { pintarTablero } from "./ui";
import { Tablero, cartas, crearTableroInicial } from "./modelo";

let tablero : Tablero = crearTableroInicial(cartas);

pintarTablero(tablero);

console.log(cartas)