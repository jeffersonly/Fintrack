import React from 'react';
import styled from 'styled-components';
import {
  Button, makeStyles, Card, CardContent 
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  font-family: Roboto;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    }
  },
});

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    marginBottom: "50px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  textfield: {
    marginBottom: "20px",
  },
  but: {
    backgroundColor: "#feffff",
    '&:hover': {
      backgroundColor: "#feffff",
      opacity: 0.8
    },
  }
});

function SplitButton() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <Router>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <ThemeProvider theme={theme}>
                    <Button
                      className={classes.but}
                      onClick={() => history.push('/splitEven')}
                      variant="contained"
                      disableElevation
                      size="large"
                      style={{ width: "100%", fontSize: "16px", marginTop: "100px", marginBottom: "100px" }}
                    >
                      Split Evenly
                                </Button>

                  </ThemeProvider>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <ThemeProvider theme={theme}>
                  <Button
                    className={classes.but}
                    onClick={() => history.push('/splitItem')}
                    variant="contained"
                    disableElevation
                    size="large"
                    style={{ width: "100%", fontSize: "16px", marginTop: "100px", marginBottom: "100px" }}
                  >
                    Itemize Receipt
                                </Button>
                </ThemeProvider>
              </CardContent>
            </Card>
          </Grid>
          </Grid>
        </Container>
      </Router>
    </div >
  );
}

export default SplitButton;
