import React, { useState } from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import AccountEvenTable from '../Cards/Split/AccountEvenTable';
import AccountItemTable from '../Cards/Split/AccountItemTable';
import './Profile.css';

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

function BillSplits() {

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

  function showSplitTable() {
    if (split === "Evenly") {
      return (
        <div>
          <br />
          <AccountEvenTable />
        </div>
      )
    }
    if (split === "By Item") {
      return (
        <div>
          <br />
          <AccountItemTable />
        </div>
      )
    }
  }

  return (
    <div className="profile">
      <h4 className="profile-title">Bill Splits</h4>
      <br />
      <ThemeProvider theme={theme}>
        <TextField
          defaultValue={split}
          helperText="Select the bill split history."
          InputLabelProps={{shrink: true}}
          label="Bill Splits"
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
        {showSplitTable()}
      </ThemeProvider>
    </div>
  )
}

export default BillSplits;