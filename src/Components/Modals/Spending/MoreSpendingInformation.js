import React, { useState, useEffect } from 'react';
import { Button, Divider, InputAdornment } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Modal, Row, Col } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import DateFnsUtils from '@date-io/date-fns';

import { API } from 'aws-amplify';
import { updateSpending } from '../../../graphql/mutations';

import TableField from '../../InputFields/TableField';
import { repeatingItems, payments, categories } from '../../InputFields/TableFieldSelects';
import { formatDate, splitDate } from '../../Tables/TableFunctions';
import '../../Cards/Profile.css';
import '../../Cards/Card.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
    secondary: {
      main: "#ff6666"
    },
  },
});

function MoreSpendingInformation(props) {

  const [show, setShow] = useState(props.openMore);
  const [changedDate, setChangedDate] = useState(false);

  useEffect(() => {
    setShow(props.openMore);
  }, [props.openMore]);

  async function editSpending(data) {
    try {
      await API.graphql({
        query: updateSpending,
        variables: {
          input: {
            id: props.itemID,
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
      props.closeMore();
      props.update(); 
    } catch (err) {
      console.log(err);
    }
  } 

  function generateForm(errors, setFieldError, values, setFieldValue) {
    return (
      <>
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
            onChange={date => {
              setFieldValue("date", date, true);
              setChangedDate(true);
            }}
            onError={err => {
              if (err !== errors.date) {
                setFieldError("date", err);
              }
            }}
            required
            value={
              !changedDate
                ? formatDate(props.itemData.month, props.itemData.day, props.itemData.year)
                : values.date
            }
            variant="inline"
          />
        </MuiPickersUtilsProvider>
        <TableField 
          label="Savings Name"
          name="name"  
        />
        <TableField
          label="Form of Payment"
          name="payment"
          options={payments}
          select={true}
        />
        <TableField
          InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
          label="Value"
          name="value"
          type="number"
        />
        <TableField
          label="Category"
          name="category"
          options={categories}
          select={true}
        />
        <TableField
          label="Repeat"
          name="repeat"
          options={repeatingItems}
          select={true}
        />
        <TableField
          label="Notes"
          multiline={true}
          name="note"
          required={false}
          rowsMax={3}
        />
      </>
    );
  }

  function generateModalContent(errors, setFieldError, values, setFieldValue) {
    if (props.itemData.url !== "") {
      return (
        <Row>
          <Col xs={12} md={6}>
            <img src={props.itemData.url} align="center" alt="receipt" className="morespending-img"/>
          </Col>
          <Col xs={12} md={6}>
            {generateForm(errors, setFieldError, values, setFieldValue)}
          </Col>
        </Row>
      );
    }
    else {
      return generateForm(errors, setFieldError, values, setFieldValue);
    }
  }

  return (
    <Modal
      className="profile"
      show={show}
      onHide={props.closeMore}
      aria-labelledby="contained-modal-title-vcenter"
      size={props.itemData.url ? "lg" : "md"}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Entry Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="editprofile-textfield">
          <ThemeProvider theme={theme}>
            <Formik
              initialValues={{
                date: formatDate(props.itemData.month, props.itemData.day, props.itemData.year),
                name: props.itemData.name,
                payment: props.itemData.payment,
                value: props.itemData.value,
                category: props.itemData.category,
                repeat: props.itemData.repeat,
                note: props.itemData.note,
              }}
              validate={(values) => {
                const errors = {};

                if (!values.name) {
                  errors.name = "Required";
                }
                if (!values.value) {
                  errors.value = "Required";
                }

                return errors;
              }}
              onSubmit={(info) => {
                if (changedDate){
                  const formattedDate = splitDate(info.date.toLocaleDateString());
                  var array = [formattedDate[0], formattedDate[1], formattedDate[2]];
                  setChangedDate(false);
                }
                else {
                  array = [props.itemData.month, props.itemData.day, props.itemData.year];
                }
                array.push(info.name, info.payment, info.value, info.category, info.repeat, info.note);
                editSpending(array);
              }}
            >
              {({ errors, setFieldError, setFieldValue, values }) => (
                <Form>
                  {generateModalContent(errors, setFieldError, values, setFieldValue)}
                  <Divider className="editprofile-divider" />
                  <div align="right">
                    <Button
                      className="profile-button editprofile-cancelbutton"
                      disableElevation
                      variant="contained"
                      disabled={!values.name || !values.value || errors.date !== ""}
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      className="deletebutton"
                      color="secondary"
                      disableElevation
                      onClick={() => {
                        props.closeMore();
                        props.confirmDelete();
                      }}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </ThemeProvider>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default MoreSpendingInformation;