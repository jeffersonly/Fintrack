import React, { useState } from 'react';
import { Button, InputAdornment, makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import DoneIcon from '@material-ui/icons/Done';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form } from 'formik';
import Loader from 'react-loader-spinner';

import { API } from 'aws-amplify';
import { createSaving } from '../../graphql/mutations';

import TableField from '../InputFields/TableField';
import { repeats } from '../InputFields/TableFieldSelects';
import { splitDate } from '../Tables/TableFunctions';
import CardTitle from './CardTitle';
import '../Cards/Card.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    }
  },
});

const useStyles = makeStyles({
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
  }
});

function CreateSaving(props) {

  const classes = useStyles();
  
  const [loaderState, setLoaderState] = useState(false);
  const [createdState, setCreatedState] = useState(false); 

  async function submitNewSaving(data) {
    try {
      await API.graphql({
        query: createSaving,
        variables: {
          input: {
            month: data[0],
            day: data[1],
            year: data[2],
            name: data[3],
            value: data[4],
            repeat: data[5],
            note: data[6]
          }
        }
      })
      setLoaderState(false);
      setCreatedState(true);
      window.location.reload();
    } catch (err) {
      console.log({ err });
    }
  }
  
  return (
    <div className="card-container card-savings">
      {props.title && <CardTitle title="Create New Savings" />}
      <ThemeProvider theme={theme}>
        <Formik
          initialValues={{ 
            date: new Date(),
            name: "",
            value: "",
            repeat: "Never",
            note: ""
          }}
          validate={values => {
            const errors = {};

            if (!values.date) {
              errors.date = "Required";
            }

            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.value) {
              errors.value = "Required";
            }

            return errors;
          }}
          onSubmit={(data, { resetForm }) => {
            setLoaderState(true); 
            const formattedDate = splitDate(data.date.toLocaleDateString());
            const array = [formattedDate[0], formattedDate[1], formattedDate[2], data.name, data.value, data.repeat, data.note];
            submitNewSaving(array); 
            resetForm();
          }}
        >
          {({ errors, setFieldError, setFieldValue, values }) => (
            <Form>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  className="card-datepicker"
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
                    }
                  }}
                  required
                  value={values.date}
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
              <p className="card-text">Please select how often the saving reoccurs.</p>
              <TableField
                label="Notes"
                multiline={true}
                name="note"
                placeholder="12 hours"
                required={false}
                rowsMax={3}
              />
              <Button
                className={classes.createbutton}
                disableElevation
                disabled={!values.name || !values.value || errors.date !== "" || createdState}
                size="large"
                type="submit"
                variant="contained"
              >
                {createdState ? (<>Created <DoneIcon /></>) : (loaderState ? <Loader type="TailSpin" color="rgb(1, 114, 71)" height={30} width={30} /> : "Create") }
              </Button>
            </Form>
          )}
        </Formik>
      </ThemeProvider>
    </div>
  );
}

export default CreateSaving;