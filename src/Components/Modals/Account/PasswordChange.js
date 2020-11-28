import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form } from 'formik';
import { Auth } from 'aws-amplify';
import TableField from '../../InputFields/TableField';
import { onKeyDown } from '../../Cards/Split/SplitFunctions';

function PasswordChange(props) {

  const [show, setShow] = useState(props.openPassword);
  const [error, setError] = useState("");

  useEffect(() => {
    setShow(props.openPassword);
  }, [props.openPassword]);

  const handleChangePassword = (oldPass, newPass) => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        //runs every time
        return Auth.changePassword(user, oldPass, newPass);
      })
      .then(data => {
        props.closePassword();
        props.alert();
      }) //happens if no errors whatsoever
      .catch(err => setError("Incorrect password."))
  };

  return (
    <Modal
      className="profile"
      show={show}
      onHide={props.closePassword}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reset Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="editprofile-textfield">
          <Formik
            initialValues={{
              currentPass: "",
              newPass: "",
              confirmNew: ""
            }}
            validate={values => {

              const errors = {};

              if (!values.currentPass) {
                errors.currentPass = "Required";
              }
              /*if (error) {
                errors.currentPass = "Does not match current password.";
              }*/
              if (!values.newPass) {
                errors.newPass = "Required";
              }
              if (values.newPass.length < 8) {
                errors.newPass = "This field must be at least 8 characters long."
              }
              if (!values.confirmNew) {
                errors.confirmNew = "Required";
              }
              if (values.newPass !== values.confirmNew) {
                errors.confirmNew = "Passwords do not match!";
              }
              
              return errors;
            }}
            onSubmit={(data) => {
              handleChangePassword(data.currentPass, data.newPass);
            }}
          >
            {({ values, errors }) => (
              <Form onKeyDown={onKeyDown}>
                <TableField
                  helperText={error ? error : null}
                  label="Current Password"
                  name="currentPass"
                  type="password"
                />
                <TableField
                  label="New Password"
                  name="newPass"
                  type="password"
                />
                <TableField
                  label="Confirm Password"
                  name="confirmNew"
                  type="password"
                />
                <Divider className="editprofile-divider"/>
                <div align="right">
                  <Button
                    className="editprofile-cancelbutton"
                    disableElevation
                    onClick={props.closePassword}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="profile-button"
                    disableElevation
                    disabled={!values.currentPass || !values.newPass || !values.confirmNew || errors.confirmNew !== undefined || errors.currentPass !== undefined}
                    type="submit"
                    variant="contained"
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PasswordChange;