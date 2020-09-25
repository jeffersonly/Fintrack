import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { useField } from 'formik';

const useStyles = makeStyles({
  textfield: {
    marginBottom: "20px"
  }
})

function TableField(props) {
  
  const classes = useStyles();

  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  
  return (
    <div className={classes.textfield}>
      <TextField
        {...field}
        error={!!errorText}
        fullWidth
        helperText={errorText}
        InputLabelProps={{shrink: true}}
        InputProps={props.inputprops}
        label={props.label}
        placeholder={props.placeholder}
        required={props.required}
        type={props.type}
        variant="outlined"
      />
    </div>
  )
}

TableField.defaultProps = {
  inputprops: "",
  label: "",
  placeholder: "",
  required: true,
  type: ""
}

export default TableField;