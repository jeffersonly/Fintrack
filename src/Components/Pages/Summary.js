import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { generate } from 'shortid';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import QuickTransaction from '../Components/Cards/QuickTransaction';
import NotificationCenter from '../Components/Cards/NotificationCenter';
import TransactionTable from '../Components/Tables/TransactionTable'; 
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

  const [rows, setRows] = useState([
    {
      id: "1",
      date: "9/24/2020",
      transaction: "birthday gift",
      pay: "Credit",
      amount: "30"
    },
    {
      id: "2",
      date: "10/23/2020",
      transaction: "test",
      pay: "Cash",
      amount: "5"
    },
    {
      id: "3",
      date: "11/10/2020",
      transaction: "test2",
      pay: "Debit",
      amount: "10"
    },
    {
      id: "4",
      date: "1/15/2021",
      transaction: "test3",
      pay: "Credit",
      amount: "20"
    }
  ]);
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
        <Col xs={12} md={4}>
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
        <Col xs={12} md={8} className="notif-center">
          <NotificationCenter />
        </Col>
      </Row>
      <Row>
        <Col xs md={3}>
          <QuickTransaction 
            onSubmit={data => {
              setRows(currentRows => [
                {
                  id: generate(),
                  date: data[0],
                  transaction: data[1],
                  pay: data[3].charAt(0).toUpperCase() + data[3].slice(1),
                  amount: data[2]
                },
                ...currentRows
              ]);
            }}
          />
        </Col>
        <Col xs md={{span: 8, offset: 1}} className="homepage-table">
          <TransactionTable rows={rows}/>
        </Col>
      </Row>
    </div>
  );
}
 
export default withRouter(Summary);