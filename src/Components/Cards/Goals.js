import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Row, Col } from 'react-bootstrap';
import EditGoals from '../Modals/Account/EditGoals';
import GoalSVG from '../../Images/goals.svg';

import { API, graphqlOperation } from "aws-amplify";
import { listGoals } from '../../graphql/queries';

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
  const [goalID, setGoalID] = useState();
  const [error, setError] = useState("");
  const [showEditGoal, setEditGoal] = useState(false);

  useEffect(() => {
    getGoalInformation();
  }, [])

  async function getGoalInformation () {
    try {
      const goalData = await API.graphql(graphqlOperation(listGoals));
      const goalList = goalData.data.listGoals.items;
      console.log(goalList);
      if (goalList.length === 0) {
        setSpendingGoal(0);
        setSavingGoal(0);
      }
      else {
        setSpendingGoal(goalList[0].spendingsGoal);
        setSavingGoal(goalList[0].savingsGoal);
        setGoalID(goalList[0].id);
      }
    } catch (error) {
      setError(error);
    }
  }

  function update (spending, saving) {
    setSpendingGoal(spending);
    setSavingGoal(saving);
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
                  <p>${spendingGoal}</p>
                </div>
                <div>
                  <b className="profile-subtitle">SAVINGS</b>
                  <p>${savingGoal}</p>
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
                    goalID={goalID}
                    openEdit={showEditGoal}
                    savings={savingGoal}
                    spendings={spendingGoal}
                    updateGoals={(spending, saving) => update(spending, saving)}
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