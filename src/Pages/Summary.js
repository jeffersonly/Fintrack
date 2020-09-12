import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
//import { Typography } from '@material-ui/core';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import QuickTransaction from '../Components/HomePage/QuickTransaction';
import TransactionTable from '../Components/HomePage/TransactionTable'; 

const Container = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 80px;
  font-family: Roboto;
`;

const CalendarContainer = styled.div`
  margin-left: -25px;
  margin-bottom: 20px;
`;

function Summary () {

  const getTodayDate = () => {
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const date = monthNames[(today.getMonth())] + " " + today.getDate() + ", " + today.getFullYear();
    return date;
  }

  const modifiers = {
    today: new Date(),
  };

  const modifiersStyles = {
    today: {
      color: 'white',
      backgroundColor: "rgb(1, 114, 71)",
    },
  };

  return (
    <Container>
      {/*<Typography variant="h4" style={{paddingBottom: "15px"}}>Welcome User!</Typography>
      <Typography variant="h6" style={{paddingBottom: "10px"}}>Today: {getTodayDate()}</Typography>*/}
      <h1 style={{paddingBottom: "20px"}}>Welcome User!</h1>
      <h3 style={{paddingBottom: "20px"}}>Today: {getTodayDate()}</h3>
      <CalendarContainer>
        <DayPicker 
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          showOutsideDays
          todayButton="Go to Today"
        />
      </CalendarContainer>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <QuickTransaction />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={8}>
          <TransactionTable />
        </Grid>
      </Grid>
    </Container>
  );
}
 
export default withRouter(Summary);