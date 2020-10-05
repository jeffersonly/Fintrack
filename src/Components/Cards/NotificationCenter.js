import React from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Carousel from 'react-bootstrap/Carousel';
import MonthlyExpenses from '../Tables/MonthlyExpenses';
import { generate } from 'shortid';
import "./NotificationCenter.css";

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
                <Button>
                  Test
                </Button>
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
                  value: "300"
                },
                {
                  id: generate(),
                  date: "10/15/20",
                  expense: "Phone",
                  value: "125"
                },
                {
                  id: generate(),
                  date: "10/31/20",
                  expense: "Rent",
                  value: "600"
                },
              ]}/>
              </CardContent>
            </Card>
          </Carousel.Item>
          <Carousel.Item as={Card}>
            <Card className="notifcenter-card" variant="outlined">
              <CardContent>
                <Button>
                  Test3
                </Button>
              </CardContent>
            </Card>
          </Carousel.Item>
        </Carousel>
      </ThemeProvider>
    </div>
  );
}

export default NotificationCenter;