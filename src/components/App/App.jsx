import React from 'react';
import { BrowserRouter as Router, Route,Routes, HashRouter } from 'react-router-dom';
import Home from '../../routes/Home';

import './App.scss';

function App() {
  return (
    <HashRouter>
        <div id="App"> 
            <Routes>
            <Route path="/" element={<Home />} />
            </Routes>
        </div>

    </HashRouter>
  );
}

export default App;
