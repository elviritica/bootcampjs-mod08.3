function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


let array = [1, 2, 3, 4, 5, 6];

let newArray = shuffleArray(array);
console.log(newArray);

