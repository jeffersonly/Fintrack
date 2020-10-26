import React from 'react';
import { withRouter , useHistory} from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { 
  Button, makeStyles, withStyles, TextField, MenuItem, Card, CardContent, Typography, Divider, InputAdornment, Input
 } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const Container = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 80px;
  font-family: Roboto;
`;

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    }
  },
});

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  divider: {
    marginBottom: "30px",
  },
  textfield: {
    marginBottom: "20px",
  },
  create: {
    backgroundColor: "#ace1af",
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  }
});

// Method to calculate split on click of "Split" button
function calculateEvenSplit () {
  var totalDinnerCost = document.getElementById("Split-Cost").value;
  var totalPartySize = document.getElementById("Split-Size").value;
  var tipPercent = 1 + (.01) * document.getElementById("Tip-Percentage").value;
  alert("Your " + totalPartySize + " way split is \n" + 
    "$" + ((totalDinnerCost/totalPartySize) * tipPercent).toFixed(2));
}

function SplitEven () {
  const history = useHistory();
  const classes = useStyles();
    return (
      <Container>
        <Grid style={{justifyContent: 'space-evenly'}}s container spacing={2}>
          <Grid item xs={2}>
            <Button
              className={classes.back}
              onClick={() => history.push('/split')}
              variant="contained"
              disableElevation
              size="large"
              style={{ width: "100%", fontSize: "16px", marginBottom: "20px" }}
            >
              ← Back
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Card className={classes.root} variant="outlined"> 
              <CardContent>
                <Typography className={classes.title} align="center">
                  Split a bill
                </Typography>
                <Divider className={classes.divider}/>
                <ThemeProvider theme={theme}>
                  <TextField
                    className={classes.textfield}
                    id="Split-Cost"
                    label="Cost"
                    type="number"
                    variant="outlined"
                    placeholder="Enter total dinner cost"
                    fullWidth
                    required
                    InputLabelProps={{shrink: true,}}
                  />
                  <TextField
                    className={classes.textfield}
                    id="Split-Size"
                    label="Size"
                    variant="outlined"
                    placeholder="Enter your party size"
                    fullWidth
                    required
                    InputLabelProps={{shrink: true,}}
                  />
                  <TextField
                    id="Tip-Percentage"
                    size="medium"
                    variant="outlined"
                    label="Tip (%)"
                    helperText="Please enter Tip (%)"
                    margin="normal"
                  >
                  </TextField>
                  <Button
                    className={classes.create}
                    id="Split-Btn"
                    variant="contained"
                    disableElevation
                    size="large"
                    style={{width: "100%", fontSize: "16px"}}
                    onClick={calculateEvenSplit}
                  >
                    Split
                  </Button>
                </ThemeProvider>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default withRouter(SplitEven);