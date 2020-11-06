import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Row, Col } from 'react-bootstrap';
import EditGoals from '../Modals/Account/EditGoals';
import GoalSVG from '../../Images/goals.svg';
import './Profile.css';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
  }
})

function Goals () {

  const [spendingGoal, setSpendingGoal] = useState();
  const [savingGoal, setSavingGoal] = useState();
  const [error, setError] = useState("");
  const [showEditGoal, setEditGoal] = useState(false);

  useEffect(() => {
    getGoalInformation();
  }, [])

  async function getGoalInformation () {
    try {
      console.log("test");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="profile">
      <h4 className="profile-title">Goals</h4>
      <Row>
        <Col xs={12} md={7}>
          <Card variant="outlined" className="profile-card">
            <CardContent>
              <ThemeProvider theme={theme}>
                {error && (<p className="profile-error">{error}</p>)}
                <p>
                  <u>Monthly</u>
                </p>
                <div>
                  <b className="profile-subtitle">SPENDINGS</b>
                  {spendingGoal ? <p>${spendingGoal}</p> : <p>$0</p>}
                </div>
                <div>
                  <b className="profile-subtitle">SAVINGS</b>
                  {savingGoal ? <p>${savingGoal}</p> : <p>$0</p>}
                </div>
                <div align="right">
                  <Button 
                    className="profile-button"
                    disableElevation
                    onClick={() => setEditGoal(true)}
                    variant="contained"
                  >
                    Edit
                  </Button>
                  <EditGoals
                    closeEdit={() => setEditGoal(false)}
                    openEdit={showEditGoal}
                    savings={savingGoal}
                    spendings={spendingGoal}
                  />
                </div>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Col>
        <Col xs={12} md={5}>
          <img src={GoalSVG} align="center" alt="goal img" className="goal-picture"/>
        </Col>
      </Row>
    </div>
  )
}

export default Goals;