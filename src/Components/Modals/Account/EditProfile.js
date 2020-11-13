import React, { useState, useEffect } from 'react';
import { Button, Divider, Link } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form } from 'formik';
import TableField from '../../InputFields/TableField';
import { onKeyDown } from '../../Cards/Split/SplitFunctions';
import '../../Cards/Profile.css';

function EditProfile(props) {

  const [show, setShow] = useState(props.openEdit);

  //used in email validation - RFC 2822 standard
  const reg = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );

  useEffect(() => {
    setShow(props.openEdit);
  }, [props.openEdit]);

  return (
    <div>
      <Modal
        className="profile"
        show={show}
        onHide={props.closeEdit}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="editprofile-textfield">
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
                props.updateEmail(data.email);
              }}
            >
              {({ values, errors }) => (
                <Form onKeyDown={onKeyDown}>
                  <TableField
                    label="Email"
                    name="email"
                  />
                  <Link 
                    className="editprofile-passwordLink"
                    component="button" 
                    onClick={(e) => {
                      e.preventDefault();
                      props.selectPassword();
                    }}
                  >
                    Change Password?
                  </Link>
                  <Divider className="editprofile-divider"/>
                  <div align="right">
                    <Button
                      className="editprofile-cancelbutton"
                      disableElevation
                      onClick={props.closeEdit}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="profile-button"
                      disableElevation
                      disabled={!values.email || errors.email !== undefined}
                      onClick={props.confirm} 
                      type="submit"
                      variant="contained"
                    >
                      Save
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

export default EditProfile;