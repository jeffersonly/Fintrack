import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Button, makeStyles, TextField, Card, CardContent, Typography, Divider, InputAdornment
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form } from 'formik';
import TableField from "../InputFields/TableField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { API, graphqlOperation } from 'aws-amplify';
import { createSaving } from '../../src/graphql/mutations';


const Container = styled.div`
  font-family: Roboto;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    }
  },
});

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  divider: {
    marginBottom: "30px",
  },
  textfield: {
    marginBottom: "20px",
  },
  create: {
    backgroundColor: "#ace1af",
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

const formState = { date: new Date().toLocaleDateString(), name: '', value: '', repeat: 'Never', note: '' };

function updateFormState(key, value) {
  formState[key] = value;
  console.log(key, value);
}
async function submitNewSaving() {
  var checkName, checkValue;
  checkName = document.getElementById("id-input").value;
  if (checkName === ""){
    alert("Enter a name for the saving");
    return false;
  }
  checkValue = document.getElementById("value-input").value;
  if (checkValue === ""){
    alert("Enter a value for the saving's amount");
    return false;
  }
  try {
    console.log (formState.date);
    console.log (formState.repeat);
    await API.graphql({
      query: createSaving,
      variables: {
        input: {
          date: formState.date,
          name: formState.name,
          value: formState.value,
          repeat: formState.repeat,
          note: formState.note
        }
      }
    })
    console.log('New saving created!');
    window.location.reload();
  } catch (err) {
    console.log({ err });
  }
}
function CreateSaving({ onSubmit }) {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateFormState('date', date.toLocaleDateString());
  };
  const resetDate = () => {
    setSelectedDate(new Date());
  };

  const [repeat, setRepeat] = React.useState('Never');
  const handleRepeatChange = (event) => {
    setRepeat(event.target.value);
    updateFormState('repeat', event.target.value);
  };

  return (
    <Container>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} align="center">
            Create New Savings
          </Typography>
          <Divider className={classes.divider} />
          <ThemeProvider theme={theme}>
            {
            /*<Formik
              initialValues={
                { value1: '', name1: '' }
              }
              validate={values => {
                const errors = {};

                if (!values.name1) {
                  errors.name1 = "Required";
                }

                if (!values.value1) {
                  errors.value1 = "Required";
                }

                return errors;
              }}
              onSubmit={(data, { resetForm }) => {
                console.log(data, selectedDate.toLocaleDateString());
                submitNewSaving();
                resetDate();
                resetForm();
              }}
            >
              {({ values }) => (
                <Form>
              */}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      fullWidth
                      className={classes.textfield}
                      variant="inline"
                      inputVariant="outlined"
                      label="Date"
                      format="MM/dd/yyyy"
                      required
                      value={selectedDate}
                      InputAdornmentProps={{ position: "end" }}
                      onChange={date => handleDateChange(date)}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    className={classes.textfield}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true, }}
                    label="Savings Name"
                    id = "id-input"
                    name="name"
                    placeholder="Paycheck"
                    required
                    onChange={e => updateFormState('name', e.target.value)}
                  />
                  <TextField
                    className={classes.textfield}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true, }}
                    id = "value-input"
                    label="Value"
                    name="value"
                    placeholder="300"
                    type="number"
                    required
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    onChange={e => updateFormState('value', e.target.value)}
                  />
                  <TextField
                    className={classes.textfield}
                    label="Repeat"
                    name="repeat"
                    variant="outlined"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true, }}
                    select
                    value={repeat}
                    required
                    onChange={handleRepeatChange}
                    helperText="Please select when the saving reoccur"
                  >
                    {repeats.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    className={classes.textfield}
                    label="Notes"
                    name="note"
                    variant="outlined"
                    placeholder="12 hours"
                    fullWidth
                    InputLabelProps={{ shrink: true, }}
                    onChange={e => updateFormState('note', e.target.value)}
                  />
                  <Button
                    className={classes.create}
                    variant="contained"
                    disableElevation
                    size="large"
                    style={{ width: "100%", fontSize: "16px" }}
                    type="submit"
                    onClick = {submitNewSaving}
                  >
                    Create
                  </Button>
                  {
            /*
                </Form>
              )}
            </Formik>
          */}
          </ThemeProvider>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CreateSaving;