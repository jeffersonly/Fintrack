import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import QuickTransaction from '../Components/Modals/Spending/QuickTransaction';
import NotificationCenter from '../Components/Cards/Notifications/NotificationCenter';
import QuickTransactionTable from '../Components/Tables/QuickTransactionTable'; 
import './Summary.css';
import { Row, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

function Summary () {

  const getTodayDate = () => {
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const date = monthNames[(today.getMonth())] + " " + today.getDate() + ", " + today.getFullYear();
    return date;
  }

  const [user, setUser] = useState("");
  const [authError, setAuthError] = useState("");

  const getUser = () => {
    Auth.currentSession()
    .then(data => setUser(data.accessToken.payload.username))
    .catch(err => setAuthError(err.message));
  };

  return (
    <div className="homepage">
      {getUser()}
      <Row>
        <Col xs={12} md={3}>
          {authError && (<p className="homepage-error">{authError}</p>)}
          <h2 className="homepage-welcome">Welcome {user}!</h2>
          <h5 className="homepage-todaydate">Today: {getTodayDate()}</h5>
          <div className="homepage-cal DayPicker">
            <DayPicker
              showOutsideDays
              todayButton="Go to Today"
            />
          </div>
        </Col>
        <Col xs={12} md={9} className="notif-center">
          <NotificationCenter />
        </Col>
      </Row>
      {/*<Row>
        <Col xs md={3}>
          <QuickTransaction />
        </Col>
        <Col xs md={{span: 8, offset: 1}} className="homepage-table">
          <QuickTransactionTable />
        </Col>
      </Row>*/}
    </div>
  );
}
 
export default withRouter(Summary);