import React from 'react';
import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function SnackbarNotification(props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={5000}
      open={props.open}
      onClose={props.onClose}
    >
      <SnackbarContent 
        className="profile-snackbar"
        message={props.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={props.onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  )
}

export default SnackbarNotification;