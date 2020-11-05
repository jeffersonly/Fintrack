import React, { useState } from 'react';
import { Button, Card, CardContent, InputAdornment, makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form } from 'formik';

import TableField from '../InputFields/TableField';
//import DateField from '../InputFields/DateField';
import CardTitle from './CardTitle';
import Dropzone from '../Dropzone/Dropzone';
import WebcamCapture from '../Webcam/Webcam';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
  },
});

const useStyles = makeStyles({
  card: {
    width: "100%",
    marginBottom: "20px",
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
  datepicker: {
    marginBottom: "20px",
  }
});

function QuickTransaction ({ onSubmit }) {
  
  const classes = useStyles();

  //const [selectedDate, setSelectedDate] = useState(new Date());

  /*const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const resetDate = () => {
    setSelectedDate(new Date());
  };*/

  const options = [
    {
      value: 'cash',
      label: 'Cash',
    },
    {
      value: 'credit',
      label: 'Credit',
    },
    {
      value: 'debit',
      label: 'Debit',
    }
  ];

  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <CardTitle title="+ Quick-Create Transaction" />
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
            <Formik
              initialValues={{
                date: new Date(),
                transaction: "",
                amount: "",
                pay: "cash"
              }}
              validate={values => {
                const errors = {};
          
                //doesn't print
                if (!values.date) {
                  errors.date = "Required";
                }

                if (!values.transaction) {
                  errors.transaction = "Required";
                }
                if (!values.amount) {
                  errors.amount = "Required";
                }
          
                return errors;
              }}
              onSubmit={(data, { resetForm }) => {
                //console.log(data.date.toLocaleDateString())
                //console.log(data, selectedDate.toLocaleDateString());
                const array = [data.date.toLocaleDateString(), data.transaction, data.amount, data.pay];
                onSubmit(array);
                //resetDate();
                resetForm();
              }}
            >
              {({ errors, setFieldError, setFieldValue, values }) => (
                <Form>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      className={classes.datepicker}
                      format="MM/dd/yyyy"
                      fullWidth
                      InputAdornmentProps={{ position: "end" }}
                      inputVariant="outlined"
                      label="Date"
                      name="date"
                      onChange={date => setFieldValue("date", date, true)}
                      onError={err => {
                        if (err !== errors.date) {
                          setFieldError("date", err);
                          console.log(errors.date);
                        }
                      }}
                      required
                      value={values.date}
                      variant="inline"
                    />
                  </MuiPickersUtilsProvider>
                  <TableField
                    label="Transaction"
                    name="transaction"
                    placeholder="Bob's Birthday Gift"
                  />
                  <TableField
                    label="Form of Payment"
                    name="pay"
                    options={options}
                    select={true}
                  />
                  <TableField
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                    label="Value"
                    name="amount"
                    placeholder="30"
                    type="number"
                  />
                  <Dropzone />
                  <WebcamCapture />
                  <Button
                    className={classes.createbutton}
                    disableElevation
                    disabled={!values.transaction || !values.amount || errors.date !== ""}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Create
                  </Button>
                </Form>
              )}
            </Formik>
          </ThemeProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuickTransaction;