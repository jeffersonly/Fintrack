import React from 'react';
import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import { useField } from 'formik';

const useStyles = makeStyles({
  textfield: {
    marginBottom: "20px"
  }
});

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
        InputProps={props.InputProps}
        label={props.label}
        placeholder={props.placeholder}
        required={props.required}
        select={props.select}
        type={props.type}
        variant="outlined"
      >
      {props.select 
        ? props.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            {option.label}
            </MenuItem>
          ))
        : ""
      }
    </TextField>
    </div>
  )
}

TableField.defaultProps = {
  inputprops: "",
  label: "",
  placeholder: "",
  required: true,
  select: false,
  type: ""
}

export default TableField;