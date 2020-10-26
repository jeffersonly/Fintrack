import React, { useState } from 'react';
import { 
  Button, TextField, makeStyles, Card, CardContent, Typography, Divider, InputAdornment
 } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
//import AddIcon from '@material-ui/icons/Add';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Dropzone from '../Dropzone/Dropzone';

import { useFormik } from 'formik';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
    secondary: {
      main: "rgb(255, 0, 0)"
    }
  },
});

const useStyles = makeStyles({
  card: {
    width: "100%",
    marginBottom: "20px",
  },
  cardtitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  container: {
    fontFamily: "Roboto",
  },
  createbutton: {
    backgroundColor: "#ace1af",
    fontSize: "16px",
    width: "100%",
    '&:focus': {
      outline: "none",
    },
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  },
  divider: {
    marginBottom: "30px",
  },
  errormessage: {
    color: "red",
    fontSize: "12px",
  },
  textfield: {
    marginBottom: "20px",
    '&:hover': {
      borderColor: "rgb(1, 114, 71) !important",
    }
  }
});

function QuickTransaction () {
  
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formik = useFormik({
    initialValues: {
      transaction: "",
      amount: ""
    },
    validate() {
      const errors = {};

      if (!formik.values.transaction) {
        errors.transaction = "Required";
      }

      if (!formik.values.amount) {
        errors.amount = "Required";
      }

      return errors;
    },
    onSubmit(values) {
      setTimeout(() => {
        alert(JSON.stringify(formik.values, null, 2));
      }, 500);
    }
  });

  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography className={classes.cardtitle} align="center">
            + Quick-Create Transaction
          </Typography>
          <Dropzone />
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
            <form onSubmit={formik.handleSubmit} noValidate>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  className={classes.textfield}
                  format="MM/dd/yyyy"
                  fullWidth
                  InputAdornmentProps={{ position: "end" }}
                  inputVariant="outlined"
                  label="Date"
                  onChange={date => handleDateChange(date)}
                  value={selectedDate}
                  variant="inline"
                />
              </MuiPickersUtilsProvider>
              {/* one character late for onChange */}
              <div className={classes.textfield}>
                <TextField
                  color={formik.errors.transaction && formik.touched.transaction ? "secondary" : "primary"}
                  fullWidth
                  id="transaction"
                  InputLabelProps={{shrink: true}}
                  label="Transaction"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Bob's Birthday Gift"
                  required
                  value={formik.values.transaction}
                  variant="outlined"
                />
                {formik.errors.transaction && formik.touched.transaction 
                  ? (<p className={classes.errormessage}>{formik.errors.transaction}</p>)
                  : ("")
                }
              </div>
              <div className={classes.textfield}>
                <TextField
                  color={formik.errors.amount && formik.touched.amount ? "secondary" : "primary"}
                  fullWidth
                  id="amount"
                  InputLabelProps={{shrink: true}}
                  InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                  label="Value"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="30"
                  required
                  type="number"
                  value={formik.values.amount}
                  variant="outlined"
                />
                {formik.errors.amount && formik.touched.amount 
                  ? (<p className={classes.errormessage}>{formik.errors.amount}</p>)
                  : ("")
                }
              </div>
              <Button
                className={classes.createbutton}
                disableElevation
                disabled={!formik.values.transaction || !formik.values.amount}
                size="large"
                type="submit"
                variant="contained"
              >
                Create
              </Button>
            </form>
          </ThemeProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuickTransaction;