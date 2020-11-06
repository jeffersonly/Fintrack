import React from 'react';
import { Button, Card, CardContent, makeStyles} from '@material-ui/core';
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

function SplitItemForm ({ onSubmit }) { 
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <CardTitle title="Itemize a Receipt" />
          <ThemeProvider theme={theme}>
            <Formik
              initialValues={{
                SIName: "",
                SIItem: "",
                SIAmount: "",
                SITip: "",
                SITax: "7.25",
                SITotal: ""
              }}
              validate={values => {
                const errors = {};
          
                if (!values.SIName) {
                  errors.SIName = "Required";
                }
                if (!values.SIItem) {
                  errors.SIItem = "Required";
                }
          
                return errors;
              }}
              onSubmit={(data, { resetForm }) => {
                console.log(data);
                const array = [data.SIName, data.SIItem, data.SIAmount, data.SITip, data.SITax];
                onSubmit(array);
                resetForm();
              }}
            >
              {({ values }) => (
                <Form>
                  <TableField
                    label="Name"
                    name="SIName"
                    placeholder="Enter Party Member Name"
                  />
                  <TableField
                    label="Item(s)"
                    name="SIItem"
                    placeholder="Enter Item Name(s)"
                  />
                  <TableField
                    label="Price"
                    name="SIAmount"
                    placeholder="Enter Item Price"
                    type="number"
                  />
                  <TableField
                    label="Tip"
                    name="SITip"
                    placeholder="Enter Tip Percentage"
                    type="number"
                  />
                  <TableField
                    label="Tax"
                    name="SITax"
                    placeholder="Enter local tax rate"
                    type="number"
                  />
                  <Button
                    className={classes.createbutton}
                    disableElevation
                    disabled={!values.SIName || !values.SIAmount}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Itemize
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

export default SplitItemForm;