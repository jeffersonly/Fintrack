import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Button, makeStyles, TextField, CardContent, InputAdornment
 } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Formik, Form } from 'formik';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import { createSpending } from '../../graphql/mutations';
import awsExports from '../../aws-exports';

import TableField from './TableField';
import { repeats, payments, categories } from './TableFieldSelects';
import { splitDate } from '../Tables/TableFunctions';
import '../Cards/Card.css';

const Container = styled.div`
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
          payment: data[4],
          file: data[9]
        }
      }
    })
    console.log('New spending created!');
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

function DropzoneInput(props) {
    console.log("hello");
    console.log(props);
    console.log(props.data.image);
    console.log("bye");


    const classes = useStyles();

  return (
    <div className="card-container card-spendings">
      <ThemeProvider theme={theme}>
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
            Storage.put(props.data.image.name, props.data.image, {
              contentType: props.data.image.type
            }).then((result) => {
              const image = {
                name: props.data.image.name,
                file: {
                  bucket: awsExports.aws_user_files_s3_bucket,
                  region: awsExports.aws_user_files_s3_bucket_region,
                  key: 'public/' + props.data.image.name
                }
              }

              //console.log(data, selectedDate.toLocaleDateString());
              const formattedDate = splitDate(data.date.toLocaleDateString());
              const array = [formattedDate[0], formattedDate[1], formattedDate[2], data.name,
                            data.payment, data.value, data.category, data.repeat, data.note, image.file];
              submitNewSpending(array);
              //resetDate();
              resetForm();
            })
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
                defaultValue={props.data.totalCost}
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
                disabled={!values.name || !values.value || errors.date !== ""}
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
    </div>
  );
}

export default DropzoneInput;