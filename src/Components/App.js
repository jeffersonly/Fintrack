import './App.css';
import React from 'react';
import NavBar from './NavBar/NavBar';

import LandingPage from '../Pages/LandingPage';

function App() {

    return (
        <div className="App">
            <NavBar/>
            <LandingPage/>
            
        </div>
    );
}

export default App;