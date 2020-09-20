import './App.css';
import React from 'react';
//import NavBar from './NavBar/NavBar';
//import LandingPage from '../Pages/LandingPage';
import TopHeader from './HomePage/TopHeader';
import HomeNav from './HomePage/HomeNav';

function App() {

    return (
        <div className="App">
            {/*<NavBar/>
            <LandingPage/>*/}
            <TopHeader />
            <HomeNav />
        </div>
    );
}

export default App;