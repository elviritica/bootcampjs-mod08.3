function voltearCarta(){
    const imagen = document.getElementById("carta") as HTMLImageElement;
    const cartaLeonSrc = "/src/images/Leon.png";

    if (imagen && imagen instanceof HTMLImageElement) {
        imagen.src = cartaLeonSrc;
    }
;}

const carta = document.getElementById("imagen-carta");

if (carta && carta instanceof HTMLDivElement) {
    carta.addEventListener("click", () => {
        voltearCarta();
    })
}