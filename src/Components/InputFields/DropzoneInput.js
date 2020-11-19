import React, { useState } from 'react';
import { Button, makeStyles, InputAdornment } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Formik, Form } from 'formik';
import { API, Storage } from 'aws-amplify';
import { createSpending } from '../../graphql/mutations';
import awsExports from '../../aws-exports';

import TableField from './TableField';
import { repeats, payments, categories } from './TableFieldSelects';
import { splitDate } from '../Tables/TableFunctions';
import '../Cards/Card.css';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import DoneIcon from '@material-ui/icons/Done';

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

function DropzoneInput(props) {
  console.log(props);
  const classes = useStyles();
  const [loaderState, setLoaderState] = useState(false);
  const [createdState, setCreatedState] = useState(false);

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
      setLoaderState(false);
      setCreatedState(true);

      if(props.from === 'camera') {
        window.location.reload();
      } else {
        props.onCreateTransaction();
        if(props.numberOfItems === (props.counter+1)) {
          window.location.reload();
        }
      }

    } catch (err) {
      console.log(err);
    }
  }
  
  function generateRandomizedString() {
    return Math.random().toString(36).substring(3);
  }

  return (
    <div className="card-container card-spendings">
      <Formik
        initialValues={{ 
          date: new Date(),
          name: "",
          payment: "Cash",
          value: props.data.totalCost,
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

          if(props.from === "camera") {
            let randomStr = generateRandomizedString();
            Storage.put(`picture-taken-from-camera-${randomStr}.jpg`, props.data.image, {
              contentType: "image/jpeg",
              ContentEncoding: 'base64'
            }).then((result) => {
              const image = {
                name: `picture-taken-from-camera-${randomStr}.jpg`,
                file: {
                  bucket: awsExports.aws_user_files_s3_bucket,
                  region: awsExports.aws_user_files_s3_bucket_region,
                  key: 'public/' + `picture-taken-from-camera-${randomStr}.jpg`
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
          } else {
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
          }
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

export default DropzoneInput;