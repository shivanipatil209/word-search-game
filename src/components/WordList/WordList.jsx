import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectWords, 
    selectFoundWords, 
    selectStartTime,
    resetFoundWords,
} from '../../reducers/gridSlice';

import  './words.scss';
import PropTypes from 'prop-types';


export default function WordList(props) {
    const { savedWords } = props;

    const isInitialMount = useRef(true);
    const foundWords = useSelector(selectFoundWords);
    const words = useSelector(selectWords);
    const displayWords = savedWords || words;
    const startTime = useSelector(selectStartTime);
    const dispatch = useDispatch();


    function showPopup() {
        var popup = document.getElementById("popup");
        popup.style.display = "block";
    
        document.getElementById("reload").addEventListener("click", reloadPage);
        document.getElementById("newPage").addEventListener("click", goToNewPage);
      }
  
      // Function to close the popup
      function closePopup() {
        var popup = document.getElementById("popup");
        popup.style.display = "none";
      }
  
      function reloadPage() {
        window.location.reload();
      }
  
      function goToNewPage() {       
        window.open("https://it.ufl.edu/it-policies/information-security/related-standards-and-documents/data-classification-guidelines/", "_blank");
        window.location.reload();
      }
    useEffect(() => {
        // used to only run useEffect code on update
        if(isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            if(foundWords === Object.keys(words).length) {
                showPopup();
            }
        }
    }, [words])
    let finishTime = new Date().getTime();
    let difference = Math.trunc( (finishTime - startTime) / 1000 );
     
    // or the shorthand way

    var word_org = {'RESTRICTED':'Data collected, maintained, or managed by the university or through any university activities that are restricted by federal or state laws, regulatory mandates, or contractual obligations.',
                    'SENSITIVE':'Data whose loss or unauthorized disclosure would impair university functions, cause financial or reputational loss or lead to legal liability',
                    'OPENDATA': 'Data that is generally available without specific information owner\'s designee or delegate approval.',
                    'FERPA': 'The Family Educational Rights and Privacy Act of 1974 is a federal law that established certain privacy rights regarding a student\'s educational record.',
                    'HIPAA': 'The Health Insurance Portability and Accountability Act of 1996 is a federal law that ensures a patient\'s sensitive health information is not disclosed without his or her consent or knowledge.',
                    'PUBLICUSE':'Information that can be accessed and used by everyone without restriction',
                    'DATASECURITY':'Protection of digital data from improper and illegal use. ',
                    'DATAOWNER': 'Senior leadership, typically at the dean, director or department chair level, with the ultimate responsibility for the use and protection of university data.',
                    'DATACUSTODIAN': 'The staff member, typically one primarily responsible for IT, that is responsible for implementation of security controls for university data.',
                    'DATAUSER':'Any member of the university community that has access to university data, and thus is entrusted with the protection of that data.',
                    'SECURITY': 'In information technology, it is the protection from harm targeting digital assets.',
                    'DATABASE': 'Structured collection of data usually stored in a computer. ',
                    'SQL':'A programming language used to manage data at UF.',
                    'SAS':'A software service used for database management at UF.',
                    'QUALTRICS': 'A web-based survey-creating service mainly for academic research purposes. Restricted data, such as student data, can be collected on here.',
                    'CLASSIFICATION':'Used to organize data according to confidentiality requirements and risk.',
                    'RISKS': 'Potential consequences of lost, stolen, or manipulated data.',
                    'ENCRYPTION': 'UF Policy requires that all portable computing and storage devices that are used with University Data, regardless of ownership, must be fully encrypted.',
                    'VPN': 'Connecting to a virtual private network is highly encouraged before accessing restricted data.',
                    'PRIVACY': 'Securing confidential information and certifying it is used appropriately.',
                    'CONFIDENTIAL':'Information that cannot be disclosed without authorization and is restricted to the use of specific people or groups.',
                    'DATA':'Information collected, analyzed, and used for all kinds of purposes.'              }
    
    
    let wordKeys = Object.keys(displayWords);
   
  
    return (
        <>
        
        <div className="wordlist">
            {<h2 id='wordlisttitle'>Word List</h2>}
            {Object.keys(displayWords).map(word => (

        <div className ="tooltip"
            id={word}
            key={word}
            found={displayWords[word].found} rel="noreferrer"
            >
            {word}
            <span className="tooltiptext">{word_org[word]}</span>
        </div>
        

    ))}
            <div className="popup-container" id="popup">
            {<h2 id="msgtitle">Congratulations!!!</h2>}
            {<p id="msg">You've solved the grid in {difference} seconds! Would you like to start another?</p>}
            <div className="button-container">
           {<button id="reload" className="popup-button" >New Puzzle</button>}
            {<button id="newPage" className="popup-button" >More Resources</button>}
             </div>
            
        </div>
           
        </div>
        
        </>
        
    )
}

WordList.propTypes = {
    savedWords: PropTypes.object
}
