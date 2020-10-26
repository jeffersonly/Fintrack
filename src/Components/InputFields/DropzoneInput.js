import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Button, makeStyles, TextField, CardContent, InputAdornment
 } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Container = styled.div`
  font-family: Roboto;
`;

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    }
  },
});

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  textfield: {
    marginBottom: "20px",
  },
  create: {
    backgroundColor: "#ace1af",
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  }
});

const categories = [
  {
    value: 'merch',
    label: 'Merchandise',
  },
  {
    value: 'food',
    label: 'Food',
  },
  {
    value: 'vehicle',
    label: 'Vehicle Services',
  },
  {
    value: 'service',
    label: 'Services',
  },
  {
    value: 'entertainment',
    label: 'Entertainment',
  },
  {
    value: 'org',
    label: 'Organizations',
  },
  {
    value: 'health',
    label: 'Health Care',
  },
  {
    value: 'travel',
    label: 'Travel',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

function DropzoneInput(props) {
    console.log(props);
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [category, setCat] = React.useState('food');

    const handleCategoryChange = (event) => {
        setCat(event.target.value);
    };

    return (
        <Container>
            <CardContent>
                <ThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            autoOk
                            fullWidth
                            className={classes.textfield}
                            variant="inline"
                            inputVariant="outlined"
                            label="Date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            InputAdornmentProps={{ position: "end" }}
                            onChange={date => handleDateChange(date)}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        className={classes.textfield}
                        label="Transaction"
                        variant="outlined"
                        placeholder="Soyful"
                        fullWidth
                        required
                        InputLabelProps={{shrink: true,}}
                    />
                    <TextField
                        className={classes.textfield}
                        label="Value"
                        variant="outlined"
                        placeholder="5"
                        fullWidth
                        type="number"
                        required
                        InputLabelProps={{shrink: true,}}
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                    />
                    <TextField
                        className={classes.textfield}
                        label="Category"
                        variant="outlined"
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true, }}
                        select
                        value={category}
                        onChange={handleCategoryChange}
                        helperText="Please select the category"
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        className={classes.textfield}
                        label="Notes"
                        variant="outlined"
                        placeholder="Hong kong mf"
                        fullWidth
                        InputLabelProps={{shrink: true,}}
                    />
                    <Button
                        className={classes.create}
                        variant="contained"
                        disableElevation
                        size="large"
                        style={{width: "100%", fontSize: "16px"}}
                    >
                        Create
                    </Button>
                </ThemeProvider>
            </CardContent>
        </Container>
    );
}

export default DropzoneInput;