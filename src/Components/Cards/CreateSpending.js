import React, { useState } from 'react';
import { Button, InputAdornment, makeStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form } from 'formik';
import Loader from 'react-loader-spinner';

import { API } from 'aws-amplify';
import { createSpending } from '../../graphql/mutations';

import TableField from '../InputFields/TableField';
import { repeats, payments, categories } from '../InputFields/TableFieldSelects';
import { splitDate } from '../Tables/TableFunctions';
import '../Cards/Card.css';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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

function CreateSpending () {
  
  const classes = useStyles();

  const [loaderState, setLoaderState] = useState(false);
  const [createdState, setCreatedState] = useState(false);
  
  /*
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const resetDate = () => {
    setSelectedDate(new Date());
  };
  */

 async function submitNewSpending(data) {
  try {
    await API.graphql({
      query: createSpending,
      variables: {
        input: {
          month: data[0],
          day: data[1],
          year: data[2],
          name: data[3],
          value: data[5],
          category: data[6],
          repeat: data[7],
          note: data[8],
          payment: data[4]
        }
      }
    })
    setLoaderState(false);
    setCreatedState(true);
    console.log('New spending created!');
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

  return (
    <div className="card-container card-spendings">
      <Formik
        initialValues={{ 
          date: new Date(),
          name: "",
          payment: "Cash",
          value: "",
          category: "Food",
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
          //console.log(data, selectedDate.toLocaleDateString());
          const formattedDate = splitDate(data.date.toLocaleDateString());
          const array = [formattedDate[0], formattedDate[1], formattedDate[2], data.name,
                        data.payment, data.value, data.category, data.repeat, data.note];
          submitNewSpending(array);
          //resetDate();
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
              label="Spendings Name"
              name="name"
              placeholder="Costco"
            />
            <TableField
              label="Form of Payment"
              name="payment"
              options={payments}
              select={true}
            />
            <TableField
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
              label="Value"
              name="value"
              placeholder="300"
              type="number"
            />
            <TableField
              label="Category"
              name="category"
              options={categories}
              select={true}
            />
            <p className="card-text">Please select the category.</p>
            <TableField
              label="Repeat"
              name="repeat"
              options={repeats}
              select={true}
            />
            <p className="card-text">Please select how often the spending reoccurs.</p>
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
    </div>
  );
}

export default CreateSpending;