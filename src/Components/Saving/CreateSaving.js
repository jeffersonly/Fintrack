import React, { useState } from 'react';
import {
  Button, Card, CardContent, InputAdornment, makeStyles
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Formik, Form } from 'formik';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { API } from 'aws-amplify';
import { createSaving } from '../../src/graphql/mutations';

import TableField from '../InputFields/TableField';
import CardTitle from '../Cards/CardTitle';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    }
  },
});

const useStyles = makeStyles({
  card: {
    width: "100%",
    marginBottom: "20px",
  },
  container: {
    fontFamily: "Roboto"
  },
  createbutton: {
    backgroundColor: "#ace1af",
    fontSize: "16px",
    width: "100%",
    '&:focus': {
      outline: "none"
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

const repeats = [
  {
    value: 'Never',
    label: 'Never',
  },
  {
    value: 'Weekly',
    label: 'Weekly',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
  {
    value: 'Yearly',
    label: 'Yearly',
  },
];

async function submitNewSaving(data) {
  try {
    await API.graphql({
      query: createSaving,
      variables: {
        input: {
          date: data[0],
          name: data[1],
          value: data[2],
          repeat: data[3],
          note: data[4]
        }
      }
    })
    console.log('New saving created!');
    window.location.reload();
  } catch (err) {
    console.log({ err });
  }
}
function CreateSaving() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const resetDate = () => {
    setSelectedDate(new Date());
  };
  
  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <CardTitle title="Create New Savings" />
          <ThemeProvider theme={theme}>
            <Formik
              initialValues={{ 
                name: "",
                value: "",
                repeat: "Never",
                note: ""
              }}
              validate={values => {
                const errors = {};

                if (!values.name) {
                  errors.name = "Required";
                }
                if (!values.value) {
                  errors.value = "Required";
                }

                return errors;
              }}
              onSubmit={(data, { resetForm }) => {
                console.log(data, selectedDate.toLocaleDateString());
                const array = [selectedDate.toLocaleDateString(), data.name, data.value, data.repeat, data.note];
                submitNewSaving(array);
                resetDate();
                resetForm();
              }}
            >
              {({ values }) => (
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
                      onChange={date => handleDateChange(date)}
                      required
                      value={selectedDate}
                      variant="inline"
                    />
                  </MuiPickersUtilsProvider>
                  <TableField
                    label="Savings Name"
                    name="name"
                    placeholder="Paycheck"
                  />
                  <TableField
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                    label="Value"
                    name="value"
                    placeholder="300"
                    type="number"
                  />
                  <TableField
                    label="Repeat"
                    name="repeat"
                    options={repeats}
                    select={true}
                  />
                  <TableField
                    label="Notes"
                    name="note"
                    placeholder="12 hours"
                    required={false}
                  />
                  <Button
                    className={classes.createbutton}
                    disableElevation
                    disabled={!values.name || !values.value}
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

export default CreateSaving;