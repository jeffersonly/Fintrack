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

function SplitEvenForm ({ onSubmit }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <CardTitle title="Split the Bill Evenly" />
          <ThemeProvider theme={theme}>
            <Formik
              initialValues={{
                SETotal: "",
                SEMembers: "",
                SETip: "",
                SESplit: ""
              }}
              validate={values => {
                const errors = {};
          
                if (!values.SETotal) {
                  errors.SETotal = "Required";
                }
                if (!values.SEMembers) {
                  errors.SEMembers = "Required";
                }
                return errors;
              }}
              onSubmit={(data, { resetForm }) => {
                console.log(data);
                const array = [data.SETotal, data.SEMembers, data.SETip, data.SESplit];
                onSubmit(array);
                resetForm();
              }}
            >
              {({ values }) => (
                <Form>
                  <TableField
                    label="Price"
                    name="SETotal"
                    placeholder="Enter Total Bill Price With Tax"
                    type="number"
                  />
                  <TableField
                    label="Party Size"
                    name="SEMembers"
                    placeholder="Enter Number of Party Members"
                    type="number"
                  />
                  <TableField
                    label="Tip"
                    name="SETip"
                    placeholder="Enter Tip Percentage (if applicable)"
                    type="number"
                  />
                  <Button
                    className={classes.createbutton}
                    disableElevation
                    disabled={!values.SETotal || !values.SEMembers}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Split
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

export default SplitEvenForm;