
const imagen = document.getElementById("carta") as HTMLImageElement;
const imagen2 = document.getElementById("carta-1") as HTMLImageElement;
const carta = document.getElementById("imagen-carta");
const carta2 = document.getElementById("imagen-carta-2");
const cartaLeonSrc = "/src/images/Leon.png";
const cartaPerroSrc = "/src/images/Perro.png";

function agregarEventoClick(cartaElement: HTMLDivElement, imagenElement: HTMLImageElement, nuevaImagenSrc: string) {
    if (cartaElement && cartaElement instanceof HTMLDivElement) {
        cartaElement.addEventListener("click", () => {
            voltearCarta(imagenElement, nuevaImagenSrc);
        });
    }
}

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