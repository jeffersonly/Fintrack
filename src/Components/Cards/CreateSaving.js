import React from 'react';
import { Button, Card, CardContent, InputAdornment, makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Formik, Form } from 'formik';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { API } from 'aws-amplify';
import { createSaving } from '../../graphql/mutations';
import TableField from '../InputFields/TableField';
import CardTitle from './CardTitle';
import '../Cards/Card.css';

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
    console.log('New saving created!');
    window.location.reload();
  } catch (err) {
    console.log({ err });
  }
}

function CreateSaving() {

  const classes = useStyles();

  /*const [selectedDate, setSelectedDate] = useState(new Date());
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const resetDate = () => {
    setSelectedDate(new Date());
  };*/

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
    //return month + "/" + day + "/" + year;
    return [month, day, year];
  }
  
  return (
    <div className="card-container">
      <Card className="card-fintrack" variant="outlined">
        <CardContent>
          <CardTitle title="Create New Savings" />
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
                //console.log(data, selectedDate.toLocaleDateString());
                const formattedDate = formatDate(data.date.toLocaleDateString());
                const array = [formattedDate[0], formattedDate[1], formattedDate[2], data.name, data.value, data.repeat, data.note];
                submitNewSaving(array);
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
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateSaving;