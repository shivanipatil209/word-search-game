function createWordSearch(words) {
    const size = 15;
    let grid = new Array(size * size).fill('_');
    let dirs = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
    let positions = grid.map((x, i) => i);
    let wordList = {};
    words.forEach(word => {
        let newInfo = findPos({word, dirs, grid, positions, size, wordList});
        grid = newInfo.grid;
        positions = newInfo.positions;
        wordList = newInfo.wordList;
    })
    return {
        grid: fillGrid(grid), 
        wordList
    };
}

function fillGrid(grid) {
    grid.forEach((cell,i) => {
        let randNum = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
        if(cell === '_') {
            grid[i] = String.fromCharCode(randNum);
        }
    })
    return grid;
}

// finds a new position for the word to occupy
function findPos(gridInfo) {
    let {word, dirs, grid, positions, size, wordList} = gridInfo;
    let posCopy = [...positions];
    
    while(true) {
        if(posCopy.length === 0) {
            delete wordList[word];
            break;
        }
        let pos = shuffle(posCopy).pop();
        let {newGrid, newList} = insertWord({word, dirs, grid, pos, size, wordList});
        if(newGrid) {
            grid = newGrid;
            wordList = newList;
            break;
        }
    }
    return {grid, positions, wordList};
}

function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
        let rand = Math.trunc(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
    }
    return arr;
}

function insertWord(wordInfo) {
    let {word, dirs, grid, pos, size, wordList} = wordInfo;
    let directions = [...dirs];
    let isInserted = false;

    while( !isInserted ) {
        if(directions.length === 0) {
            grid = false;
            break;
        }
        else {
            let gridCopy = [...grid];
            let newPos = pos;
            let row = Math.trunc(newPos / size);
            let col = newPos % size;
            let [dRow, dCol] = shuffle(directions).pop();
            
            if( wordCanFit({row, col, dRow, dCol, size, word}) ) {
                for(let i = 0; i < word.length; i++) {
                    if(i === 0) {
                        wordList[word] = {
                            first: newPos,
                            dir: [dRow, dCol],
                            found: 'false'
                        };
                    }
                    let letter = word[i];
                    let gridLetter = grid[newPos];
                    if(gridLetter === '_' || gridLetter === letter) {
                        gridCopy[newPos] = letter;
                        if(i === word.length - 1) {
                            isInserted = true;
                            grid = [...gridCopy];
                            wordList[word].last = newPos;
                        }
                    }
                    else {
                        break;
                    }
                    row += dRow;
                    col += dCol;
                    if( !isWithinGrid(row, col, size) ) {
                        break;
                    }
                    newPos = (row * size) + col;
                } 
            }
        }
        
    }
    return {newGrid: grid, newList: wordList};
}

function wordCanFit(wordInfo){
    let {row, col, dRow, dCol, size, word} = wordInfo;
    let len = word.length - 1;
    row += (dRow * len);
    col += (dCol * len);
    return isWithinGrid(row, col, size);
}

 function isWithinGrid(row, col, size) {
    return (row >= 0 && row < size) && (col >= 0 && col < size);
}

export { createWordSearch, isWithinGrid };