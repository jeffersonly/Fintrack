import React, { useState, useEffect } from 'react';
import { Button, Divider, InputAdornment } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form } from 'formik';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

//import { deleteSaving } from '../../graphql/mutations';
import { API } from "aws-amplify";
//import { getSaving } from '../../graphql/queries';
import { updateSaving } from '../../../graphql/mutations';

import TableField from '../../InputFields/TableField';
import { repeats } from '../../InputFields/TableFieldSelects';
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

function MoreSavingInformation(props) {

  const [show, setShow] = useState(props.openMore);
  //const [itemID, setItemID] = useState(props.itemID);
  //const [data, setData] = useState([]);
  //const [selectedDate, setSelectedDate] = useState(Date());
  const [changedDate, setChangedDate] = useState(false);

  //const [showConfirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setShow(props.openMore);
    //setItemID(props.itemID);
    //getData(props.item);
  }, [props.openMore]); //, [props.itemID]);

  /*async function getData(item) {
    //console.log(props.data.name);
    const itemData = await API.graphql(graphqlOperation(getSaving, { id: item }));
    const itemName = itemData.data.getSaving;
    setData(itemName);
  }

  /*async function handleDelete(event) {
    try {
      const id = {
        id: event
      }
      await API.graphql(graphqlOperation(deleteSaving, { input: id }));
      console.log('Deleted saving')
      props.closeMore();
      window.location.reload();
    }
    catch (error) {
      console.log('Error on delete saving', error)
    }
  }*/

  async function editSaving(data) {
    try {
      await API.graphql({
        query: updateSaving,
        variables: {
          input: {
            id: props.itemID,
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
      console.log('Saving updated!');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  /*const handleDateChange = (date) => {
    setSelectedDate(date);
    setChangedDate(true);
  };
  
  /*function handleShowConfirmDelete() {
    setConfirmDelete(true);
  }*/

  return (
    <div>
      {/*{data && Object.entries(data).map((key, value) => (*/}
      {/*{props.itemData && Object.entries(props.itemData).map((key, value) => (*/}
      <Modal
        className="profile"
        show={show}
        onHide={props.closeMore}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        //key={value}
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
                  value: props.itemData.value,
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
                    //console.log(data, selectedDate.toLocaleDateString());
                    //console.log(data.date.toLocaleDateString());
                    const formattedDate = splitDate(info.date.toLocaleDateString());
                    console.log(formattedDate);
                    var array = [formattedDate[0], formattedDate[1], formattedDate[2]];
                  }
                  else {
                    array = [props.itemData.month, props.itemData.day, props.itemData.year];
                  }
                  array.push(info.name, info.value, info.repeat, info.note);
                  editSaving(array);
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
                      InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
                      label="Value"
                      name="value"
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
                      multiline={true}
                      name="note"
                      required={false}
                      rowsMax={3}
                    />
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
                        //onClick={() => handleDelete(itemID)}
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
    </div>
  );
}

export default MoreSavingInformation;