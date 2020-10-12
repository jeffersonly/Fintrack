import React, { useState, useEffect } from 'react';
import { Button, Divider, makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TableField from '../InputFields/TableField';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
  }
})

const useStyles = makeStyles({
  button: {
    backgroundColor: "#ace1af",
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
    '&:focus': {
      outline: "none"
    },
  },
  cancelbutton: {
    marginRight: "10px"
  },
  divider: {
    marginBottom: "20px"
  },
  error: {
    fontSize: "14px",
    color: "red"
  },
  modal: {
    fontFamily: "Roboto"
  },
  textfield: {
    paddingTop: "10px",
    paddingBottom: "10px"
  }
})

function PasswordChange(props) {

  const classes = useStyles();

  const [show, setShow] = useState(props.openPassword);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(props.openPassword);
  }, [props.openPassword]);

  return (
    <div>
      <Modal
        className={classes.modal}
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Reset Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={classes.textfield}>
            <ThemeProvider theme={theme}>
              <Formik
                initialValues={{
                  currentpass: "",
                  newpass: "",
                  confirmnew: ""
                }}
                validate={values => {

                  const errors = {};

                  if (!values.currentpass) {
                    errors.currentpass = "Required";
                  }
                  //need to check currentpass matches current one
                  if (!values.newpass) {
                    errors.newpass = "Required";
                  }
                  if (!values.confirmnew) {
                    errors.confirmnew = "Required";
                  }
                  if (values.newpass !== values.confirmnew) {
                    errors.confirmnew = "Passwords do not match!";
                  }
                  
                  return errors;
                }}
                onSubmit={(data) => {
                  console.log(data);
                }}
              >
                {({ values, errors }) => (
                  <Form>
                    <TableField
                      label="Current Password"
                      name="currentpass"
                      type="password"
                    />
                    <TableField
                      label="New Password"
                      name="newpass"
                      type="password"
                    />
                    <TableField
                      label="Confirm Password"
                      name="confirmnew"
                      type="password"
                    />
                    <Divider className={classes.divider}/>
                    <div align="right">
                      <Button
                        className={classes.cancelbutton}
                        disableElevation
                        onClick={handleClose}
                        variant="contained"
                      >
                        Cancel
                      </Button>
                      <Button 
                        className={classes.button}
                        disableElevation
                        disabled={!values.currentpass || !values.newpass || !values.confirmnew || errors.confirmnew !== undefined}
                        onClick={handleClose} 
                        type="submit"
                        variant="contained"
                      >
                        Reset
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

export default PasswordChange;