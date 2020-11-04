import React, {useState} from 'react';
import { withRouter, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import { 
  Button, makeStyles, withStyles, TextField, MenuItem, Card, CardContent, Divider, InputAdornment, Input
 } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// Split components
import SplitItemTable from '../Components/Split/SplitItemTable';
import SplitItemForm from '../Components/Split/SplitItemForm';

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
  tableTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    paddingBottom: "15px"
  },
  container: {
    maxHeight: 400,
  },
  create: {
    backgroundColor: "#ace1af",
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  }
});

function SplitItem () {
  const [rows, setRows] = useState([]);
  const history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <Container>
        <SplitItemForm
          onSubmit={data => {
            setRows(currentRows => [
              {
                tName: data[0],
                tItem: data[1],
                tAmmount: data[2]
              },
              ...currentRows
            ]);
          }}
        />
        <SplitItemTable rows={rows}/>
      </Container>
    </div>
  );
  /*
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
          </Grid>
        </Grid>
      </Container>
    );
    */
  }
  
  export default withRouter(SplitItem);