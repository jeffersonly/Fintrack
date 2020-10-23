import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@material-ui/core';
import { Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TableField from '../InputFields/TableField';
import '../Cards/Profile.css';

function MoreInformation(props) {

  const [show, setShow] = useState(props.openMore);

  useEffect(() => {
    setShow(props.openMore);
  }, [props.openMore]);

  return (
    <div>
      <Modal
        className="profile"
        show={show}
        onHide={props.closeMore}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            More Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="editprofile-textfield">
            <p>test</p>
            <Divider className="editprofile-divider"/>
            <div align="right">
              <Button
                className="editprofile-cancelbutton"
                disableElevation
                variant="contained"
              >
                Edit
              </Button>
              <Button 
                className="profile-button"
                disableElevation
                type="submit"
                variant="contained"
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MoreInformation;