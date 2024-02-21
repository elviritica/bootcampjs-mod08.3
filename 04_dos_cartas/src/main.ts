
const imagen = document.getElementById("carta") as HTMLImageElement;
const imagen2 = document.getElementById("carta-1") as HTMLImageElement;
const carta = document.getElementById("imagen-carta") as HTMLDivElement;
const carta2 = document.getElementById("imagen-carta-2") as HTMLDivElement;
const cartaLeonSrc = "/src/images/Leon.png";
const cartaPerroSrc = "/src/images/Perro.png";


function voltearCarta(img: HTMLImageElement, nuevoSrc: string){
    if (img && img instanceof HTMLImageElement) {
        img.src = nuevoSrc;
    }
;}


if (carta && carta instanceof HTMLDivElement) {
    carta.addEventListener("click", () => {
        voltearCarta(imagen, cartaLeonSrc);
    })

}

if (carta2 && carta2 instanceof HTMLDivElement) {
    carta2.addEventListener("click", () => {
        voltearCarta(imagen2, cartaPerroSrc);
    })

}