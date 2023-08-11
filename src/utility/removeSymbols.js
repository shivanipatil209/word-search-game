export function removeSymbols(words) {
    let regex = /[^A-Za-z]/gi;
    words.forEach((word, i) => {
        words[i] = word.replace(regex,"").toUpperCase();
    })
    return words;
}