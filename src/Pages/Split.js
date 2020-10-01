import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { 
  Button, makeStyles, TextField, Card, CardContent, Typography, Divider, InputAdornment
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

function Split () {
  const classes = useStyles();
    return (
      <Container>
        <h1 style={{height:'100px', width: '1000px'}}>
          This application allows users to split the bill or itemize a receipt!
        </h1>
        <Grid style={{justifyContent: 'space-evenly'}}s container spacing={2}>
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
                    label="Cost"
                    variant="outlined"
                    placeholder="Enter total dinner cost"
                    fullWidth
                    required
                    InputLabelProps={{shrink: true,}}
                  />
                  <TextField
                    className={classes.textfield}
                    label="Size"
                    variant="outlined"
                    placeholder="Enter your party size"
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
                  >
                    Split
                  </Button>
                </ThemeProvider>
              </CardContent>
            </Card>
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
                  >
                    Add Party Member
                  </Button>
                  <Divider className={classes.divider}/>
                  <TextField
                    className={classes.textfield}
                    label="Meal"
                    variant="outlined"
                    placeholder="Enter the name of a meal"
                    fullWidth
                    required
                    InputLabelProps={{shrink: true,}}
                  />
                  <TextField
                    className={classes.textfield}
                    label="Price"
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
                  >
                    Add Meal to Receipt
                  </Button>
                </ThemeProvider>
              </CardContent>
            </Card>
            <TableContainer component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3}>
                    Name
                  </TableCell>
                  <TableCell align="center">
                    Number of items
                  </TableCell>
                  <TableCell align="right">
                    Cost
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left" colSpan={3}>
                    Person1
                  </TableCell>
                  <TableCell align="center">
                    #
                  </TableCell>
                  <TableCell align="right">
                    Individual Total 2
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" colSpan={3}>
                    Person2
                  </TableCell>
                  <TableCell align="center">
                    #
                  </TableCell>
                  <TableCell align="right">
                    Individual Total 2
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"/>
                  <TableCell align="right">
                    Total Bill
                  </TableCell>
                  <TableCell align="right">
                    Total Cost $
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default withRouter(Split);