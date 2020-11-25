import React, { useState, useEffect } from 'react';
import { Button, InputAdornment, makeStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DoneIcon from '@material-ui/icons/Done';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Loader from 'react-loader-spinner';

import { API } from 'aws-amplify';
import { createSpending } from '../../../graphql/mutations';

import TableField from '../../InputFields/TableField';
import { payments } from '../../InputFields/TableFieldSelects';
import { splitDate } from '../../Tables/TableFunctions';
import Dropzone from '../../Dropzone/Dropzone';
import WebcamCapture from '../../Webcam/Webcam';
import '../../Cards/Card.css';
import '../../Cards/Profile.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const useStyles = makeStyles({
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
  }
});

function QuickTransaction(props) {
  
  const classes = useStyles();

  const [show, setShow] = useState(props.openQuick);
  const [loaderState, setLoaderState] = useState(false);
  const [createdState, setCreatedState] = useState(false);

  useEffect(() => {
    setShow(props.openQuick);
  }, [props.openQuick]);

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
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal
      className="profile"
      show={show}
      onHide={props.closeQuick}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Quick-Create Spending
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="editprofile-textfield">
          <Formik
            initialValues={{
              date: new Date(),
              name: "",
              payment: "Cash",
              value: "",
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
              const array = [formattedDate[0], formattedDate[1], formattedDate[2], data.name,
              data.payment, data.value, "", "Never", ""];
              submitNewSpending(array);
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
                  placeholder="Bob's Birthday Gift"
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
                  placeholder="30"
                  type="number"
                />
                <Dropzone />
                <WebcamCapture />
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
      </Modal.Body>
    </Modal>
  );
}

export default QuickTransaction;