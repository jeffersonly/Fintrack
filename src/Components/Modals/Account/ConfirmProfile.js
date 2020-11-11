import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form } from 'formik';
import TableField from '../../InputFields/TableField';
import { Auth } from 'aws-amplify';
import '../../Cards/Profile.css';

function ConfirmProfile(props) {

  const [show, setShow] = useState(props.openConfirm);
  const [error, setError] = useState("");

  useEffect(() => {
    setShow(props.openConfirm);
  }, [props.openConfirm]);

  const handleConfirm = (code) => {
    Auth.verifyCurrentUserAttributeSubmit('email', code)
    .then(() => {
      props.closeConfirm();
      props.verified(true);
      props.alert();
    }).catch(e => {
      setError(e.message);
    });
  };

  /*const resendConfirm = () => {
    Auth.resendSignUp(props.username)
      .then(res => alert("New confirmation code sent"))
      .catch(err => console.log(err))
  }*/

  return (
    <div>
      <Modal
        className="profile"
        show={show}
        onHide={() => {
          props.closeConfirm(); 
          props.verified(false);
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Verify New Email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="editprofile-textfield">
            <Formik
              initialValues={{
                code: "",
              }}
              validate={values => {

                const errors = {};

                if (!values.code) {
                  errors.code = "Required";
                }
                if (values.code.length !== 6) {
                  errors.code = "The code is 6 digits."
                }

                return errors;
              }}
              onSubmit={(data) => {
                handleConfirm(data.code);
              }}
            >
              {({ values, errors }) => (
                <Form>
                  <TableField
                    helperText={error ? error : null}
                    label="Confirmation Code"
                    name="code"
                  />
                  <p className="profile-informative-text">
                    A confirmation code has been sent to your new email.
                    <br/>
                    Please use the code to confirm your account within 24 hours.
                    <br />
                    This is necessary for future possible password resets.
                  </p>
                  <Divider className="editprofile-divider"/>
                  <div align="right">
                    <Button
                      className="editprofile-cancelbutton"
                      disableElevation
                      onClick={() => {
                        props.closeConfirm();
                        props.verified(false);
                      }}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="profile-button"
                      disableElevation
                      disabled={!values.code || errors.code !== undefined}
                      type="submit"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ConfirmProfile;