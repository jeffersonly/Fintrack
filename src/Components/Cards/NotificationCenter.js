import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Carousel from 'react-bootstrap/Carousel';
import { generate } from 'shortid';

import MonthlyExpenses from '../Tables/MonthlyExpenses';
import MainGraphMenu from '../Graphs/MainGraphMenu';
import './NotificationCenter.css';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
  },
});

function NotificationCenter () {
  
  return (
    <div className="notifcenter-container">
      <Typography className="notifcenter-table-title" align="center">
          Notification Center
      </Typography>
      <ThemeProvider theme={theme}>
        <Carousel>
          <Carousel.Item as={Card}>
            <Card className="notifcenter-card" variant="outlined">
              <CardContent>
                <Typography align="center" style={{fontWeight: "bold", fontSize: "16px"}}>
                  Notifications
                </Typography>
              </CardContent>
            </Card>
          </Carousel.Item>
          <Carousel.Item as={Card}>
            <Card className="notifcenter-card" variant="outlined">
              <CardContent>
                <MonthlyExpenses rows={[
                  {
                    id: generate(),
                    date: "10/13/20",
                    expense: "Credit Card",
                    value: 300
                  },
                  {
                    id: generate(),
                    date: "10/15/20",
                    expense: "Phone",
                    value: 125
                  },
                  {
                    id: generate(),
                    date: "10/31/20",
                    expense: "Rent",
                    value: 600
                  },
                ]}/>
              </CardContent>
            </Card>
          </Carousel.Item>
          <Carousel.Item as={Card}>
            <Card className="notifcenter-card" variant="outlined">
              <CardContent>
                <MainGraphMenu />
              </CardContent>
            </Card>
          </Carousel.Item>
        </Carousel>
      </ThemeProvider>
    </div>
  );
}

export default NotificationCenter;