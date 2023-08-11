import randomColor from 'randomcolor';

function highlightWord(wordInfo) {
    let { first, dir, word, size } = wordInfo;
    let [row, col] = first;
    let [dRow, dCol] = dir;
    for(let i = 0; i < word.length; i++) {
        let pos = (row * size) + col;
        document.getElementById(`cell${pos}`).setAttribute('highlighted', true);
        row += dRow;
        col += dCol;
    }
}

function clearHighlights() {
    let cells = document.getElementsByClassName('gridCell');
    let words = document.getElementsByClassName('solvedWords');
    [...cells, ...words].forEach(el => {
        el.removeAttribute('highlighted');
    })
}

function generateRandomColor() {
    const color = randomColor({
        luminosity: 'bright',
        format: 'hsla',
        alpha: '0.5'
    })
    document.documentElement.style.setProperty('--highlight-color', color);
}

export {highlightWord, clearHighlights, generateRandomColor};