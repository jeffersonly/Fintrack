import React from 'react';
import { Button, InputAdornment, makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Formik, Form } from 'formik';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { API } from 'aws-amplify';
import { createSpending } from '../../graphql/mutations';

import TableField from '../InputFields/TableField';
import { splitDate } from '../Tables/TableFunctions';
//import CardTitle from './CardTitle';
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

const categories = [
  {
    value: 'Entertainment',
    label: 'Entertainment',
  },
  {
    value: 'Food',
    label: 'Food',
  },
  {
    value: 'Health Care',
    label: 'Health Care',
  },
  {
    value: 'Merchandise',
    label: 'Merchandise',
  },
  {
    value: 'Organizations',
    label: 'Organizations',
  },
  {
    value: 'Services',
    label: 'Services',
  },
  {
    value: 'Travel',
    label: 'Travel',
  },
  {
    value: 'Vehicle Services',
    label: 'Vehicle Services',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

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
          value: data[4],
          category: data[5],
          repeat: data[6],
          note: data[7]
        }
      }
    })
    console.log('New spending created!');
    window.location.reload();
  } catch (err) {
    console.log({ err });
  }
}

function CreateSpending () {
  
  const classes = useStyles();

  /*
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const resetDate = () => {
    setSelectedDate(new Date());
  };
  */

  return (
    <div className="card-container">
      {/*<Card className="card-fintrack" variant="outlined">
        <CardContent>*/}
          {/*<CardTitle title="Create New Spending" />*/}
          <ThemeProvider theme={theme}>
            <Formik
              initialValues={{ 
                date: new Date(),
                name: "",
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
                //console.log(data, selectedDate.toLocaleDateString());
                const formattedDate = splitDate(data.date.toLocaleDateString());
                const array = [formattedDate[0], formattedDate[1], formattedDate[2], data.name, data.value, data.category, data.repeat, data.note];
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
        {/*</CardContent>
      </Card>*/}
    </div>
  );
}

export default CreateSpending;