import React, { useState, useEffect } from 'react';
import { Button, Divider, Link, makeStyles } from '@material-ui/core';
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
  passwordLink: {
    fontSize: "13px",
    paddingBottom: "15px",
    '&:focus': {
      outline: "none"
    },
  },
  textfield: {
    paddingTop: "10px"
  }
})

function EditProfile(props) {

  const classes = useStyles();

  const [show, setShow] = useState(props.openEdit);
  //const [authError, setAuthError] = useState("");

  const handleClose = () => setShow(false);

  //used in email validation - RFC 2822 standard
  const reg = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );

  function openPassword() {
    props.selectPassword();
  }

  useEffect(() => {
    setShow(props.openEdit);
  }, [props.openEdit]);

  return (
    <div>
      {/*{authError && (<p className={classes.error}>{authError}</p>)}*/}
      <Modal
        className={classes.modal}
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={classes.textfield}>
            <ThemeProvider theme={theme}>
              <Formik
                initialValues={{
                  email: "",
                }}
                validate={values => {

                  const errors = {};

                  if (!values.email) {
                    errors.email = "Required";
                  }
                  if (!reg.test(values.email)) {
                    errors.email = "Please enter a valid email.";
                  }
                  if (values.email === props.email) {
                    errors.email = "This email is your current default email.";
                  }

                  return errors;
                }}
                onSubmit={(data) => {
                  console.log(data);
                  //update(data.email);
                }}
              >
                {({ values, errors }) => (
                  <Form>
                    <TableField
                      label="Email"
                      name="email"
                    />
                    <Link 
                      className={classes.passwordLink} 
                      component="button" 
                      onClick={openPassword}
                    >
                      Change Password?
                    </Link>
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
                        disabled={!values.email || errors.email !== undefined}
                        onClick={handleClose} 
                        type="submit"
                        variant="contained"
                      >
                        Save
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

export default EditProfile;