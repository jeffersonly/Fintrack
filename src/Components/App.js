import './App.css';
import React from 'react';
//import NavBar from './NavBar/NavBar';
//import LandingPage from '../Pages/LandingPage';
import TopHeader from './HomePage/TopHeader';
import NavBar from './HomePage/NavBar';

function App() {

    return (
        <div className="App">
            {/*<NavBar/>
            <LandingPage/>*/}
            <TopHeader />
            <NavBar />
        </div>
    );
}

export default App;