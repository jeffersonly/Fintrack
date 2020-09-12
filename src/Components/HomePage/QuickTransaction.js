import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Button, makeStyles, TextField, Card, CardContent, Typography, Divider, InputAdornment
 } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
//import AddIcon from '@material-ui/icons/Add';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Container = styled.div`
  font-family: Roboto;
`;

const QuickDate = styled.div`
  width: 100%;
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

function QuickTransaction () {
  
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} align="center">
            + Quick-Create Transaction
          </Typography>
          <Divider className={classes.divider}/>
          {/*<DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder={`${formatDate(new Date())}`}
            dayPickerProps={{todayButton: 'Go to Today'}}
            style={{ 
            }}
          />*/}
          <ThemeProvider theme={theme}>
            {/*<TextField
              className={classes.textfield}
              id="date"
              variant="outlined"
              label="Date"
              type="date"
              fullWidth
              defaultValue={new Date()}
              InputLabelProps={{shrink: true}}
            />*/}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                fullWidth
                className={classes.textfield}
                variant="inline"
                inputVariant="outlined"
                label="Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "end" }}
                onChange={date => handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
            <TextField
              className={classes.textfield}
              label="Transaction"
              variant="outlined"
              placeholder="Bob's Birthday Gift"
              fullWidth
              required
              InputLabelProps={{shrink: true,}}
            />
            <TextField
              className={classes.textfield}
              label="Value"
              variant="outlined"
              placeholder="30"
              fullWidth
              required
              InputLabelProps={{shrink: true,}}
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            />
            <Button
              className={classes.create}
              variant="contained"
              disableElevation
              size="large"
              style={{width: "100%", fontSize: "16px"}}
            >
              Create
            </Button>
          </ThemeProvider>
        </CardContent>
      </Card>
    </Container>
  );
}

export default QuickTransaction;