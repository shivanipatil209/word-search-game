import { createSlice } from '@reduxjs/toolkit';
import { createWordSearch, removeSymbols} from '../utility';
import _ from 'underscore';
export const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        grid: [],
        firstChar: '',
        highlighted: [],
        words: {},
        color: '',
        foundWords: 0,
        startTime: 0
    },
    reducers: {
        setWords: (state, action) => {
            state.words = action.payload;
        },
        setGrid: (state, action) => {
            state.grid = action.payload;
        },
        setFirstChar: (state, action) => {
            state.firstChar = action.payload;
        },
        setLastChar: (state, action) => {
            state.lastChar = action.payload;
        },
        setHighlighted: (state, action) => {
            state.highlighted = action.payload;
        },
        setColor: (state, action) => {
            state.color = action.payload;
        },
        incrementFound: (state) => {
            state.foundWords += 1;
        },
        setStartTime: (state, action) => {
            state.startTime = action.payload;
        },
        }
    }
);
export const fetchWords = (newGame) => (dispatch, getState) => {
    const currentGrid = getState().grid.grid;
    if( currentGrid.length === 0 || newGame) {
                let words_org = ['Restricted','Sensitive','Open Data','FERPA','HIPAA','Public Use','Data Security','Data Owner','Data Custodian','Data User','Security','Database',
                'SQL','SAS','Qualtrics','Classification','Risks','Encryption','VPN','Privacy','Confidential','Data']

                let words = removeSymbols(_.sample(words_org, [8]));
                let {grid, wordList} = createWordSearch(words);
                dispatch(setGrid(grid));
                dispatch(setWords(wordList));
            }
    };

export const makePuzzle = words => (dispatch, getState) => {
    const title = getState().grid.puzzleTitle;
    words = removeSymbols(words);
    let { grid, wordList } = createWordSearch(words);
    dispatch(setGrid(grid));
    dispatch(setWords(wordList));
}

export const resetFoundWords = () => (dispatch, getState) => {
    let wordCopy = {...getState().grid.words};
    Object.keys(wordCopy).forEach(word => {
        let contents = wordCopy[word];
        wordCopy[word] = {...contents, found: "false"}
    })
    dispatch(setWords(wordCopy)); 
}

/* ACTIONS */
export const { 
    setGrid, 
    setWords, 
    setFirstChar, 
    setHighlighted, 
    setColor, 
    incrementFound, 
    setShowPuzzle ,
    setStartTime,
    setPuzzleTitle
} = gridSlice.actions;


/* SELECTORS */
export const selectWords = state => state.grid.words;
export const selectGrid = state => state.grid.grid;
export const selectFirstChar = state => state.grid.firstChar;
export const selectHighlighted = state => state.grid.highlighted;
export const selectColor = state => state.grid.color;
export const selectFoundWords = state => state.grid.foundWords;
export const selectStartTime = state => state.grid.startTime;

export default gridSlice.reducer;





