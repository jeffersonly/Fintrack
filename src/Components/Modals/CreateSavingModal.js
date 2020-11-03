import React, { useState, useEffect } from 'react';
//import { Divider, Grid } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import CreateSaving from '../Cards/CreateSaving';
import '../Cards/Profile.css';
import '../Cards/Card.css';

function CreateSavingModal(props) {

	const [show, setShow] = useState(props.openCreateSaving);

  useEffect(() => {
      setShow(props.openCreateSaving);
  }, [props.openCreateSaving]);

  return (
    <div >
      <Modal
        className="profile"
        show={show}
        onHide={props.closeCreateSaving}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create New Savings</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <CreateSaving title={false}/>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateSavingModal;
