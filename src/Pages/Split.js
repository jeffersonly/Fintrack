import React, { useState } from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import EvenSplit from '../Components/Cards/Split/EvenSplit';
import ItemSplit from '../Components/Cards/Split/ItemSplit';
import './Split.css';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
    secondary: {
      main: "#ff6666"
    }
  },
});

function Split() {

  const [split, setSplit] = useState("Evenly");

  const options = [
    {
      value: 'Evenly',
      label: 'Evenly'
    },
    {
      value: 'By Item',
      label: 'By Item'
    }
  ]

  function showSplitForm() {
    if (split === "Evenly") {
      return (
        <div>
          <br />
          <EvenSplit />
        </div>
      )
    }
    if (split === "By Item") {
      return (
        <div>
          <br />
          <ItemSplit />
        </div>
      )
    }
  }

  return (
    <div className="split">
      <ThemeProvider theme={theme}>
        <TextField
          defaultValue={split}
          helperText="Select how the bill will be split."
          InputLabelProps={{shrink: true}}
          label="Splitting the Bill"
          onChange={(event) => setSplit(event.target.value)}
          options={options}
          select
          value={split}
          variant="outlined"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            {option.label}
            </MenuItem>
          ))}
        </TextField>
        {showSplitForm()}
      </ThemeProvider>
    </div>
  );
}

export default withRouter(Split);