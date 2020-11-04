import React, { useState } from 'react';
import { 
  Button, Card, CardContent, InputAdornment, makeStyles
 } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Formik, Form } from 'formik';

import TableField from "../InputFields/TableField";
import CardTitle from "../Cards/CardTitle";

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
  },
});

const useStyles = makeStyles({
  card: {
    width: "100%",
    marginBottom: "20px",
  },
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

function SpliSEItemForm ({ onSubmit }) {
  
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <CardTitle title="Itemize Receipt" />
          <ThemeProvider theme={theme}>
            <Formik
              initialValues={{
                SEName: "",
                SEItem: "",
                SEAmount: ""
              }}
              validate={values => {
                const errors = {};
          
                if (!values.SEName) {
                  errors.SEName = "Required";
                }
                if (!values.SEItem) {
                  errors.SEItem = "Required";
                }
          
                return errors;
              }}
              onSubmit={(data, { resetForm }) => {
                console.log(data);
                const array = [data.SEName, data.SEItem, data.SEAmount];
                onSubmit(array);
                resetForm();
              }}
            >
              {({ values }) => (
                <Form>
                  <TableField
                    label="Name"
                    name="SEName"
                    placeholder="Enter Party Member Name"
                  />
                  <TableField
                    label="Item"
                    name="SEItem"
                    placeholder="Enter Item Name"
                  />
                  <TableField
                    label="Price"
                    name="SEAmount"
                    type="number"
                  />
                  <Button
                    className={classes.createbutton}
                    disableElevation
                    disabled={!values.SEName || !values.SEAmount}
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

export default SpliSEItemForm;