import React from 'react';
import { withRouter, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { 
  Button, makeStyles, withStyles, TextField, MenuItem, Card, CardContent, Typography, Divider, InputAdornment, Input
 } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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

// Method to add new party member on click of "add party member" button
function addPartyMember () {
  var partyMember = document.getElementById("Party-Member").value;
  alert(partyMember);
}

// Method to add meal to receipt on click of "add meal to receipt" button
function addMealToReceipt () {
  var mealName = document.getElementById("Meal-Name").value;
  var mealPrice = document.getElementById("Meal-Price").value;
  alert(mealName + " " + mealPrice);
}

function SplitItem () {
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
                  Itemize a Receipt
                </Typography>
                <Divider className={classes.divider}/>
                <ThemeProvider theme={theme}>
                  <TextField
                    className={classes.textfield}
                    label="Party Member"
                    id="Party-Member"
                    variant="outlined"
                    placeholder="Enter the name of a party member"
                    fullWidth
                    required
                    InputLabelProps={{shrink: true,}}
                  />
                  <Button
                    className={classes.create}
                    variant="contained"
                    disableElevation
                    size="large"
                    style={{width: "100%", fontSize: "16px"}}
                    onClick={addPartyMember}
                  >
                    Add Party Member
                  </Button>
                  <Divider className={classes.divider}/>
                  <TextField
                    className={classes.textfield}
                    label="Meal"
                    id="Meal-Name"
                    variant="outlined"
                    placeholder="Enter the name of a meal"
                    fullWidth
                    required
                    InputLabelProps={{shrink: true,}}
                  />
                  <TextField
                    className={classes.textfield}
                    label="Price"
                    id="Meal-Price"
                    variant="outlined"
                    placeholder="Enter the price of a meal"
                    fullWidth
                    required
                    InputLabelProps={{shrink: true,}}
                  />
                  <Button
                    className={classes.create}
                    variant="contained"
                    disableElevation
                    size="large"
                    style={{width: "100%", fontSize: "16px"}}
                    onClick={addMealToReceipt}
                  >
                    Add Meal to Receipt
                  </Button>
                  <TextField
                    className={classes.textfield}
                    label="Tax"
                    variant="outlined"
                    size="medium"
                    placeholder="Enter local tax rate"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                  />
                  <TextField
                    id="select-tip-percentage"
                    select
                    size="medium"
                    variant="outlined"
                    label="Tip"
                    helperText="Please select Tip"
                    margin="normal"
                    defaultValue="15%"
                  >
                    <MenuItem>10%</MenuItem>
                    <MenuItem>12.5%</MenuItem>
                    <MenuItem>15%</MenuItem>
                    <MenuItem>17.5%</MenuItem>
                    <MenuItem>20%</MenuItem>
                  </TextField>
                </ThemeProvider>
              </CardContent>
            </Card>
            <TableContainer component={Paper}>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell> Name </StyledTableCell>
                    <StyledTableCell align="center"> Number of items </StyledTableCell>
                    <StyledTableCell align="right"> Cost </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell> Person1 </TableCell>
                    <TableCell align="center"> # </TableCell>
                    <TableCell align="right"> Individual Total 2 </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> Person2 </TableCell>
                    <TableCell align="center"> # </TableCell>
                    <TableCell align="right"> Individual Total 2 </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell/>
                    <TableCell> Tip% </TableCell>
                    
                    <TableCell align={"right"}> Total Tip </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell> Total Bill </TableCell>
                    <TableCell align={"right"}> Bill $ </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default withRouter(SplitItem);