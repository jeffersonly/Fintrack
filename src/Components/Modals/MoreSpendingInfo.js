import React, { useState, useEffect } from 'react';
import { Button, Divider, InputAdornment} from '@material-ui/core';
import { Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TableField from '../InputFields/TableField';
import { deleteSpending } from '../../graphql/mutations';
import { API, graphqlOperation } from "aws-amplify";
//import { getSpending } from '../../graphql/queries';
import { updateSpending } from '../../graphql/mutations';
import '../Cards/Profile.css';
import '../Cards/Card.css';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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
  
  const categories = [
    {
      value: 'Merchandise',
      label: 'Merchandise',
    },
    {
      value: 'Food',
      label: 'Food',
    },
    {
      value: 'Vehicle Services',
      label: 'Vehicle Services',
    },
    {
      value: 'Services',
      label: 'Services',
    },
    {
      value: 'Entertainment',
      label: 'Entertainment',
    },
    {
      value: 'Organizations',
      label: 'Organizations',
    },
    {
      value: 'Health Care',
      label: 'Health Care',
    },
    {
      value: 'Travel',
      label: 'Travel',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];

function MoreSpendingInfo(props) {

    const [show, setShow] = useState(props.openMore);
    const [itemID, setItemID] = useState(props.itemID);
    //const [data, setData] = useState([]);
    //const [selectedDate, setSelectedDate] = useState(Date());
    const [changedDate, setChangedDate] = useState(false);

  useEffect(() => {
    setShow(props.openMore);
    setItemID(props.itemID);
    //getData(props.item);
  }, [props.openMore], [props.item]);

  /*
  async function getData(item) {
    const itemData = await API.graphql(graphqlOperation(getSpending, { id: item }));
    const itemName = itemData.data.getSpending;
    setData(itemName);
  }
  */

  async function handleDelete(event) {
    try {
      const id = {
        id: event
      }
      await API.graphql(graphqlOperation(deleteSpending, { input: id }));
      console.log('Deleted spending')
      setShow(props.closeMore);
      window.location.reload();
    }
    catch (error) {
      console.log('Error on delete spending', error)
    }
  }

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
            value: data[4],
            category: data[5],
            repeat: data[6],
            note: data[7]
          }
        }
      })
      console.log('Spending updated!');
      window.location.reload();
    } catch (err) {
      console.log({ err });
    }
  }

  /*
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setChangedDate(true);
  };
*/
const splitDate = (date) => {
    let split = date.split("/");
    let month = split[0];
    let day = split[1];
    let year = split[2];
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return [month, day, year];
  }

  const formatDate = (month, day, year) => {
    return month + "/" + day + "/" + year;
  }  
  
  return (
    <div >
      {/*data && Object.entries(data).map((key, value) => (*/}
        <Modal
          className="profile"
          show={show}
          onHide={props.closeMore}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          //key={value}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="editprofile-textfield">
            <ThemeProvider theme={theme}>
              <Formik
                initialValues={{
                  date: formatDate(props.itemData.month, props.itemData.day, props.itemData.year),
                  name: props.itemData.name,
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
                    //console.log(data, selectedDate.toLocaleDateString());
                    const formattedDate = splitDate(info.date.toLocaleDateString());
                    console.log(formattedDate);
                    var array = [formattedDate[0], formattedDate[1], formattedDate[2]];
                  }
                  else {
                    var array = [props.itemData.month, props.itemData.day, props.itemData.year];
                  }
                  array.push(info.name, info.value, info.category, info.repeat, info.note);
                  editSpending(array);
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
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
                        className="editprofile-cancelbutton"
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
                        onClick={() => handleDelete(itemID)}
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

export default MoreSpendingInfo;