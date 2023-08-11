import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '../../components/Grid';
import WordList from '../../components/WordList';
import { fetchWords, setStartTime } from '../../reducers/gridSlice';
import { generateRandomColor } from '../../utility';
import './home.scss';


function showPopup() {
    var popup = document.getElementById("help-popup");
    popup.style.display = "block";
    document.getElementById("close").addEventListener("click", closePopup);
  }

  // Function to close the popup
  function closePopup() {
    var popup = document.getElementById("help-popup");
    popup.style.display = "none";
  }

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchWords());
        generateRandomColor();
        dispatch(setStartTime( new Date().getTime() ));
    })
    
    return (
        <>
         <div className="home">
         {<h1 id="gamename">Word Search Game</h1>}
               {<div className="gridWrapper">
                    <Grid/>
                    <WordList/>
                </div>}
               {<button id="help" onClick={showPopup}>How to Play?</button>}
         <div className="help-popup-container" id="help-popup">
            {<button id="close" onClick={closePopup}>X</button>}
            {<h2 id="helptitle">How to Play</h2>}
            {<p id="helpmsg">Words may appear forward (left to right or right to left), downward, upward, and diagonally (in all four diagonal directions).</p> }  
            
         </div>
         </div>
        

           
        </>
        
    )
}
