import './App.css';
import React from 'react';
//import NavBar from './NavBar/NavBar';
//import LandingPage from '../Pages/LandingPage';
import TopHeader from './NavBar/TopHeader';
import HomeNav from './NavBar/HomeNav';
import Summary from '../Pages/Summary';
import Spendings from '../Pages/Spendings';
import Savings from '../Pages/Savings';
import Expenses from '../Pages/Expenses';
import Transactions from '../Pages/Transactions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

    return (
        <div className="App">
            {/*<NavBar/>
            <LandingPage/>*/}
            <TopHeader />
            <Router>
                <HomeNav />
                <Switch>
                    <Route exact path="/summary">
                        <Summary />
                    </Route>
                    <Route path="/spendings">
                        <Spendings />
                    </Route>
                    <Route path="/transactions">
                        <Transactions />
                    </Route>
                    <Route path="/expenses">
                        <Expenses />
                    </Route>
                    <Route path="/savings">
                        <Savings />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;