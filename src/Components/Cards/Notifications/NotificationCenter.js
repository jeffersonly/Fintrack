import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Carousel, Row, Col } from 'react-bootstrap';

import { API, graphqlOperation } from 'aws-amplify';
import { listGoals } from '../../../graphql/queries';

import MonthlyExpenses from '../../Tables/MonthlyExpenses';
import SavingsGraph from '../../Graphs/SavingsGraph';
import TransactionsGraph from '../../Graphs/TransactionsGraph';
import SavingNotification from './SavingNotification';
import SpendingNotification from './SpendingNotification';
import WeeklyNotification from './WeeklyNotification';
import QuickTransactionTable from '../../Tables/QuickTransactionTable';
import './NotificationCenter.css';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
  },
});

function NotificationCenter() {
  
  const [spendingGoal, setSpendingGoal] = useState();
  const [savingGoal, setSavingGoal] = useState();

  useEffect(() => {
    getGoalInformation();
  })

  async function getGoalInformation() {
    try {
      const goalData = await API.graphql(graphqlOperation(listGoals));
      const goalList = goalData.data.listGoals.items; 
      if (goalList.length === 0) {
        setSpendingGoal(0);
        setSavingGoal(0);
      }
      else {
        setSpendingGoal(goalList[0].spendingsGoal);
        setSavingGoal(goalList[0].savingsGoal);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="notifcenter-container">
      <ThemeProvider theme={theme}>
        <Carousel className="d-none d-sm-block">
          <Carousel.Item as={Card}>
            <Card className="notifcenter-card" variant="outlined">
              <CardContent>
                <Typography align="center" style={{fontWeight: "bold", fontSize: "20px", paddingTop: "10px", paddingBottom: "10px"}}>
                  Notifications
                </Typography>
                <Row>
                  <Col>
                    <WeeklyNotification />
                  </Col>
                  <Col>
                    <SpendingNotification spending={spendingGoal}/>
                  </Col>
                  <Col>
                    <SavingNotification saving={savingGoal}/>
                  </Col>
                </Row>
              </CardContent>
            </Card>
          </Carousel.Item>
          <Carousel.Item as={Card}>
            <Card className="notifcenter-card" variant="outlined">
              <CardContent>
                <QuickTransactionTable />
              </CardContent>
            </Card>
          </Carousel.Item>
          <Carousel.Item as={Card}>
            <Card className="notifcenter-card" variant="outlined">
              <CardContent>
                <TransactionsGraph />
              </CardContent>
            </Card>
          </Carousel.Item>
          <Carousel.Item as={Card}>
            <Card className="notifcenter-card" variant="outlined">
              <CardContent>
                <SavingsGraph />
              </CardContent>
            </Card>
          </Carousel.Item>
          <Carousel.Item as={Card}>
            <Card className="notifcenter-card" variant="outlined">
              <CardContent>
                <MonthlyExpenses />
              </CardContent>
            </Card>
          </Carousel.Item>
        </Carousel>
        <div className="d-block d-sm-none">
          <Typography align="center" style={{ fontWeight: "bold", fontSize: "16px" }}>
            Notifications
          </Typography>
          <div className="notification-card">
            <WeeklyNotification />
            <SpendingNotification spending={spendingGoal}/>
            <SavingNotification saving={savingGoal}/>
          </div>
          <div className="overview">
            <QuickTransactionTable />
            <br />
            <br />
            <TransactionsGraph />
            <br />
            <SavingsGraph />
            < br />
            <MonthlyExpenses />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default NotificationCenter;