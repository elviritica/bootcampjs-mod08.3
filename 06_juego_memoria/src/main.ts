import "./style.css";
import { iniciaPartidaUI } from "./ui";
import { Tablero, cartas, crearTableroInicial } from "./modelo";

let tablero : Tablero = crearTableroInicial(cartas);

iniciaPartidaUI(tablero);