import './App.css';
import React, {useState, useEffect} from 'react';
import LandingPage from '../Pages/LandingPage';
import TopHeader from './HomePage/TopHeader';
import HomeNav from './HomePage/HomeNav';
import Summary from '../Pages/Summary';
import Spendings from '../Pages/Spendings';
import Savings from '../Pages/Savings';
import Expenses from '../Pages/Expenses';
import Transactions from '../Pages/Transactions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import AuthenticatedRoute from '../Components/Routes/AuthenticatedRoute';

function App() {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [userAuthenticated, setUserAuthenticated] = useState(false);

    useEffect(() => {
        onLoad();
    }, []);

    //check if user is logged in
    async function onLoad() {
        try {
            await Auth.currentSession();
            setUserAuthenticated(true);
        }
        catch(err) {
            if(err !== 'No current user') {
                alert(err);
            }
        }
        setIsAuthenticating(!isAuthenticating);
    }

    function renderHomeNav() {
        if(userAuthenticated) {
            return (
                <>
                    <TopHeader />
                    <HomeNav />
                </>
            );
        }
        return null;
    }

    return (
        !isAuthenticating &&
        <div className="App">
            <Router>
                {renderHomeNav()}
                <Switch>
                    {!userAuthenticated ? <Route exact path="/" render={(props) => (<LandingPage {...props} loginModalOpen={false}/>)}/>
                    : <AuthenticatedRoute exact path="/" component={Summary} appProps={{userAuthenticated, setUserAuthenticated}} />}
                    
                    {!userAuthenticated ? <Route exact path="/login" render={(props) => (<LandingPage {...props} loginModalOpen={true}/>)}/> 
                    : <AuthenticatedRoute exact path="/" component={Summary} appProps={{userAuthenticated, setUserAuthenticated}} />}}
                    

                    <AuthenticatedRoute exact path="/summary" component={Summary} appProps={{userAuthenticated, setUserAuthenticated}} />
                    <AuthenticatedRoute exact path="/spendings" component={Spendings} appProps={{userAuthenticated, setUserAuthenticated}} /> 
                    <AuthenticatedRoute exact path="/transactions" component={Transactions} appProps={{userAuthenticated, setUserAuthenticated}} />
                    <AuthenticatedRoute exact path="/expenses" component={Expenses} appProps={{userAuthenticated, setUserAuthenticated}} />
                    <AuthenticatedRoute exact path="/savings" component={Savings} appProps={{userAuthenticated, setUserAuthenticated}} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;