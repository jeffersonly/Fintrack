import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Button, makeStyles, TextField, Card, CardContent, Typography, Divider, InputAdornment
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

const repeats = [
  {
    value: 'never',
    label: 'Never',
  },
  {
    value: 'week',
    label: 'Weekly',
  },
  {
    value: 'month',
    label: 'Monthly',
  },
  {
    value: 'year',
    label: 'Yearly',
  },
];

function CreateExpense() {

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [repeat, setRepeat] = React.useState('never');

  const handleRepeatChange = (event) => {
    setRepeat(event.target.value);
  };

  return (
    <Container>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} align="center">
            Create New Expense
          </Typography>
          <Divider className={classes.divider} />
          <ThemeProvider theme={theme}>
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
              label="Expense"
              variant="outlined"
              placeholder="Internet"
              fullWidth
              required
              InputLabelProps={{ shrink: true, }}
            />
            <TextField
              className={classes.textfield}
              label="Value"
              variant="outlined"
              placeholder="40"
              fullWidth
              type="number"
              required
              InputLabelProps={{ shrink: true, }}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
            <TextField
              className={classes.textfield}
              label="Repeat"
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{ shrink: true, }}
              select
              value={repeat}
              onChange={handleRepeatChange}
              helperText="Please select when the expense reoccur"
            >
              {repeats.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classes.textfield}
              label="Notes"
              variant="outlined"
              placeholder="ATT"
              fullWidth
              InputLabelProps={{ shrink: true, }}
            />
            <Button
              className={classes.create}
              variant="contained"
              disableElevation
              size="large"
              style={{ width: "100%", fontSize: "16px" }}
            >
              Create
            </Button>
          </ThemeProvider>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CreateExpense;