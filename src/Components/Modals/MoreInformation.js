import React, { useState, useEffect } from 'react';
import { Button, Divider, InputAdornment} from '@material-ui/core';
import { Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TableField from '../InputFields/TableField';
import { deleteSaving } from '../../graphql/mutations';
import { API, graphqlOperation } from "aws-amplify";
import { getSaving } from '../../graphql/queries';
import { updateSaving } from '../../graphql/mutations';
import '../Cards/Profile.css';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


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

function MoreInformation(props) {

  const [show, setShow] = useState(props.openMore);
  const [item, setItem] = useState(props.item);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(Date());
  const [changedDate, setChangedDate] = useState(false);

  useEffect(() => {
    setShow(props.openMore);
    setItem(props.item);
    getData(props.item);
  }, [props.openMore], [props.item]);

  async function getData(item) {
    const itemData = await API.graphql(graphqlOperation(getSaving, { id: item }));
    const itemName = itemData.data.getSaving;
    setData(itemName);
  }

  async function handleDelete(event) {
    try {
      const id = {
        id: event
      }
      await API.graphql(graphqlOperation(deleteSaving, { input: id }));
      console.log('Deleted saving')
      setShow(props.closeMore);
      window.location.reload();
    }
    catch (error) {
      console.log('Error on delete saving', error)
    }
  }

  async function editSaving(data) {
    try {
      await API.graphql({
        query: updateSaving,
        variables: {
          input: {
            id: props.item,
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
      console.log('pain')
      console.log({ err });
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setChangedDate(true);
  };

  const formatDate = (date) => {
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
  
  return (
    <div >
      {data && Object.entries(data).map((key, value) => (
        <Modal
          className="profile"
          show={show}
          onHide={props.closeMore}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          key={value}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="editprofile-textfield">
              <Formik
                enableReinitialize
                initialValues={{
                  name: data.name,
                  value: data.value,
                  repeat: data.repeat,
                  note: data.note,
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
                onSubmit={(data) => {
                  if (changedDate){
                    console.log(data, selectedDate.toLocaleDateString());
                    const formattedDate = formatDate(selectedDate.toLocaleDateString());
                    const array = [
                      formattedDate[0],
                      formattedDate[1],
                      formattedDate[2],
                      data.name,
                      data.value,
                      data.repeat,
                      data.note,
                    ];
                    editSaving(array);
                  }
                  else{
                    const array = [
                      data.year, 
                      data.month, 
                      data.day,
                      data.name,
                      data.value,
                      data.repeat,
                      data.note,
                    ];
                    editSaving(array);
                  }
                  
                }}
              >
                {({ values }) => (
                  <Form>
                    Date:
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        className="card-datepicker"
                        format="MM/dd/yyyy"
                        fullWidth
                        InputAdornmentProps={{ position: "end" }}
                        inputVariant="outlined"
                        onChange={(date) => handleDateChange(date)}
                        value={
                          !changedDate
                            ? new Date(data.year, data.month - 1, data.day)
                            : selectedDate
                        }
                        variant="inline"
                      />
                    </MuiPickersUtilsProvider>
                    Saving Name:
                    <TableField value={data.name} name="name" />
                    Value:
                    <TableField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      name="value"
                      type="number"
                    />
                    Repeat:
                    <TableField
                      name="repeat"
                      options={repeats}
                      select={true}
                    />
                    Notes:
                    <TableField
                      name="note"
                      required={false}
                    />
                    <Divider className="editprofile-divider" />
                    <div align="right">
                      <Button
                        className="editprofile-cancelbutton"
                        disableElevation
                        variant="contained"
                        disabled={!values.name || !values.value}
                        type="submit"
                      >
                        Edit
                      </Button>
                      <Button
                        className="profile-button"
                        disableElevation
                        variant="contained"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Modal.Body>
        </Modal>
      ))}
    </div>
  );

}

export default MoreInformation;