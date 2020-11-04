import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withRouter, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { 
  Button, makeStyles, withStyles, TextField, MenuItem, Card, CardContent, Typography, Divider, InputAdornment, Input
 } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import Collapse from '@material-ui/core/Collapse';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { propTypes } from 'react-bootstrap/esm/Image';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';



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
  var table = document.getElementById("testTable");
  var row = document.createElement('splitrow');
  var td0 = document.createElement('td');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  td0.innerHTML = document.getElementById("Party-Member").value;
  td1.innerHTML = document.getElementById("Meal-Name").value;
  td2.innerHTML = "$" + document.getElementById("Meal-Price").value;
  row.appendChild(td0);
  row.appendChild(td1);
  row.appendChild(td2);
  //table.children[0].appendChild(row);
  table.children[0].insertBefore(row, table.children[0].childNodes[1]);
  td1.value = "";
  

  // var mealName = document.getElementById("Meal-Name").value;
  // var mealPrice = document.getElementById("Meal-Price").value;
  // alert(mealName + " " + mealPrice);
}

// Test form
function MyForm () {
  return (
    <div id="MyForm">
      <h3>Itemize Receipt</h3>
      <form onSubmit={addPartyMember}>
        <label for="Name">
          Name:
          <input id="giveName" type="text" name="giveName"/>
        </label>
        <label for="Item">
          Item:
          <input id="giveItem" type="text" name="giveItem"/>
        </label>
        <label for="Price">
          Price:
          <input id="givePrice" type="number" name="givePrice"/>
        </label>
        <button type="submit" value="submit">Add Meal</button>
      </form>
    </div>
  );
}

// Test table
function MyTable () {
  
  return (
    <div id="MyTable">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
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
                </ThemeProvider>
              </CardContent>
            </Card>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table" id="testTable" border="1">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Party Member</TableCell>
                    <TableCell align="center">Item</TableCell>
                    <TableCell align="center">Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default withRouter(SplitItem);