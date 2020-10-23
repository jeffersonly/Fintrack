import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Button
} from '@material-ui/core';
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listSavings, savingsByOwner } from '../../graphql/queries';
import { TextField } from '@material-ui/core';
import { Search, Close, Info } from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from "@material-ui/core/Snackbar";
import { Modal, Form } from 'semantic-ui-react'


const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
  tableTitle: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  createbutton: {
    backgroundColor: "#ace1af",
    fontSize: "16px",
    width: "100%",
    '&:focus': {
      outline: "none"
    },
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  },
})

const columns = [
  { id: "date", label: "Date", align: "center", minWidth: 50 },
  { id: "name", label: "Savings Name", align: "center", minWidth: 150 },
  { id: "value", label: "Value", align: "center", minWidth: 100 },
  { id: "repeat", label: "Repeat", align: "center", minWidth: 100 },
  { id: "info", label: "", align: "center", minWidth: 50 },
];

function AlertMessage({ message }) {
  const [open, setOpen] = React.useState(true);
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        variant="warning"
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={message}
        action={[
          <IconButton key="close" onClick={handleClose}>
            <Close />
          </IconButton>
        ]}
      />
    </div>
  );
}

function editItem() {

}

function SavingTableS() {
  const [savings, setSaving] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatusBase] = useState("");

  useEffect(() => {
    fetchSaving();
  }, []);
  const fetchSaving = async () => {
    if (search === "") {
      try {
        const savingData = await API.graphql(graphqlOperation(listSavings));
        const savingList = savingData.data.listSavings.items;
        console.log('saving list', savingList);
        setSaving(savingList)
      } catch (error) {
        console.log('Error on fetching saving', error)
      }
    }
    else {
      const owner = await Auth.currentAuthenticatedUser();
      const input = {
        owner: owner.username,
        name: {
          beginsWith: search,
        },
      };
      const savingData = await API.graphql(graphqlOperation(savingsByOwner, input));
      const savingList = savingData.data.savingsByOwner.items;
      console.log(savingList);
      if (savingList.length > 0) {
        setSaving(savingList);
      }
      else {
        setStatusBase({ msg: "No match: Clear your search to see your Savings", key: Math.random() });
      }

    }

  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    fetchSaving();
  };

  const handleClose = () => {this.setState({show:false})};
  const handleOpen = () =>{this.setState({show:true})};

  const classes = useStyles();
  return (
    <TableContainer className={classes.container}>
      <TextField
        className={classes.textfield}
        variant="outlined"
        placeholder="Search"
        fullWidth
        InputLabelProps={{ shrink: true, }}
        value={search}
        onChange={search => handleChange(search)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton
                onClick={handleClick}
                type="submit">
                <Search />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {savings.map((saving) => {
            return (
              <TableRow hover key={saving.id}>
                <TableCell align="center">{saving.date}</TableCell>
                <TableCell align="center">{saving.name}</TableCell>
                <TableCell align="center">${saving.value}</TableCell>
                <TableCell align="center">{saving.repeat}</TableCell>
                <TableCell align="center">   
                <Modal trigger={  <IconButton onClick={this.state.handleOpen}> <Info /> </IconButton>}  open={this.state.modalOpen} Close onClose={this.state.handleClose}> 
                  <Modal.Header>Details</Modal.Header>
                  <Modal.Content>
                    
                  </Modal.Content>
                </Modal>  
                </TableCell>
              </TableRow>
            );
          })
          }
        </TableBody>
      </Table>
      {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
    </TableContainer>
  );
}

export default SavingTableS;