import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import Modal from 'react-bootstrap/Modal';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import '../Cards/Profile.css';
import './ConfirmDelete.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
    secondary: {
      main: "#ff6666"
    },
  },
});

function ConfirmDelete(props) {
  
  const [show, setShow] = useState(props.openConfirmDelete);
  
  useEffect(() => {
    setShow(props.openConfirmDelete);
  }, [props.openConfirmDelete]);

  return (
    <Modal
      className="profile"
      show={show}
      onHide={props.closeConfirmDelete}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Entry?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="editprofile-textfield">
          <p>Are you sure you want to delete this entry?</p>
          <p className="confirmdelete-warning">
            <WarningIcon fontSize="small"/> This action cannot be undone.
          </p>
          <Divider className="editprofile-divider"/>
          <div align="right">
            <Button
              className="editprofile-cancelbutton"
              disableElevation
              onClick={() => props.closeConfirmDelete()}
              variant="contained"
            >
              Cancel
            </Button>
            <ThemeProvider theme={theme}>
              <Button 
                className="deletebutton"
                color="secondary"
                disableElevation
                onClick={() => props.confirmed()}
                variant="contained"
              >
                Delete
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmDelete;
