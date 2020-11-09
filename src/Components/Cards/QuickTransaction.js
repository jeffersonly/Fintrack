import React from 'react';
import { Button, Card, CardContent, InputAdornment, makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form } from 'formik';

import { API } from 'aws-amplify';
import { createSpending } from '../../graphql/mutations';

import TableField from '../InputFields/TableField';
import { payments } from '../InputFields/TableFieldSelects';
import { splitDate } from '../Tables/TableFunctions';
import CardTitle from './CardTitle';
import Dropzone from '../Dropzone/Dropzone';
import WebcamCapture from '../Webcam/Webcam';
import '../Cards/Card.css';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
  },
});

const useStyles = makeStyles({
  container: {
    fontFamily: "Roboto",
  },
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

function QuickTransaction () {
  
  const classes = useStyles();

  //const [selectedDate, setSelectedDate] = useState(new Date());

  /*const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const resetDate = () => {
    setSelectedDate(new Date());
  };*/

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
      console.log('New spending created!');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.container}>
      <Card className="card-fintrack" variant="outlined">
        <CardContent>
          <CardTitle title="+ Quick-Create Spending" />
          {/*<DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder={`${formatDate(new Date())}`}
            dayPickerProps={{todayButton: 'Go to Today'}}
            style={{ 
            }}
          />*/}
          <ThemeProvider theme={theme}>
            {/*<TextField
              className={classes.textfield}
              id="date"
              variant="outlined"
              label="Date"
              type="date"
              fullWidth
              defaultValue={new Date()}
              InputLabelProps={{shrink: true}}
            />*/}
            <Formik
              initialValues={{
                date: new Date(),
                name: "",
                payment: "Cash",
                value: "",
              }}
              validate={values => {
                const errors = {};
          
                //doesn't print
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
                //console.log(data.date.toLocaleDateString())
                //console.log(data, selectedDate.toLocaleDateString());
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

export default QuickTransaction;