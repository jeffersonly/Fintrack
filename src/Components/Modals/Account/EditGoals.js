import React, { useState, useEffect } from 'react';
import { Button, Divider, InputAdornment } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form } from 'formik';

import { API } from "aws-amplify";
import { createGoal, updateGoal } from '../../../graphql/mutations';

import TableField from '../../InputFields/TableField';
import '../../Cards/Profile.css';

function EditGoals(props) {

  const [show, setShow] = useState(props.openEdit);

  useEffect(() => {
    setShow(props.openEdit);
  }, [props.openEdit]);

  //prevent submitting form when hit "enter" on edit email modal
  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  async function editGoals(spending, saving) {
    if (props.spendings === 0 && props.savings === 0) {
      try {
        await API.graphql({
          query: createGoal,
          variables: {
            input: {
              spendingsGoal: spending,
              savingsGoal: saving
            }
          }
        })
        props.closeEdit();
      } catch (err) {
        console.log(err);
      }
    }
    else {
      try {
        await API.graphql({
          query: updateGoal,
          variables: {
            input: {
              id: props.goalID,
              spendingsGoal: spending,
              savingsGoal: saving
            }
          }
        })
        props.closeEdit();
      } catch (err) {
        console.log(err);
      }
    }
  }

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
            Edit Goals
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="editprofile-textfield">
            <Formik
              initialValues={{
                spendings: props.spendings,
                savings: props.savings
              }}
              validate={values => {

                const errors = {};

                if (!values.spendings && values.spendings !== 0) {
                  errors.spendings = "Required";
                }
                if (!values.savings && values.savings !== 0) {
                  errors.savings = "Required";
                }

                return errors;
              }}
              onSubmit={(data) => {
                console.log(data);
                editGoals(data.spendings, data.savings);
                props.updateGoals(data.spendings, data.savings);
                props.closeEdit();
              }}
            >
              {({ values, errors }) => (
                <Form onKeyDown={onKeyDown}>
                  <TableField
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                    label="Spending per Month"
                    name="spendings"
                    type="number"
                  />
                  <TableField
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                    label="Savings per Month"
                    name="savings"
                    type="number"
                  />
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
                      disabled={(!values.spendings && values.spendings !== 0) || (!values.spendings && values.spendings !== 0) || (values.spendings === 0 && values.savings === 0)}
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

export default EditGoals;