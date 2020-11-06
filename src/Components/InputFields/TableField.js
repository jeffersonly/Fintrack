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
  const customText = props.helperText && meta.touched;

  // Default value is passed as a prop to table field, however it's not being set for textfield...
  // Bring this issue up in Friday's meeting
  // console.log(props.defaultValue); 
  return (
    <div className={classes.textfield}>
      <TextField
        {...field}
        error={customText ? !!props.helperText : !!errorText}
        fullWidth
        helperText={customText ? props.helperText : errorText}
        InputLabelProps={{shrink: true}}
        InputProps={props.InputProps}
        label={props.label}
        multiline={props.multiline}
        placeholder={props.placeholder}
        required={props.required}
        rowsMax={props.rowsMax}
        select={props.select}
        type={props.type}
        defaultValue={props.defaultValue}
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
  multiline: false,
  placeholder: "",
  required: true,
  select: false,
  type: "",
  defaultValue: ""
}

export default TableField;