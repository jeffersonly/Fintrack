import React, { useState, useEffect } from 'react';
import { 
  IconButton, InputAdornment, Table, TableBody, TableCell, 
  TableContainer, TableRow, TextField 
} from '@material-ui/core';
import { Search, Info } from '@material-ui/icons';
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listSavings, savingsByOwner } from '../../graphql/queries';

import TableHeader from '../Tables/TableHeader';
import SnackbarNotification from '../Modals/SnackbarNotification';
import MoreInformation from '../Modals/MoreInformation';
import '../Tables/Table.css';


const columnTitles = [
  { id: "date", label: "Date", align: "center", minWidth: 50 },
  { id: "name", label: "Savings Name", align: "center", minWidth: 150 },
  { id: "value", label: "Value", align: "center", minWidth: 100, numeric: true },
  { id: "repeat", label: "Repeat", align: "center", minWidth: 100 },
  { id: "info", label: "More Information", align: "center", minWidth: 50 },
];

function descendingComparator(a, b, orderBy) {
  if (orderBy === "date") {
    let bdate = new Date(b.date);
    let adate = new Date(a.date);
    if (bdate < adate) {
      return -1;
    }
    if (bdate > adate) {
      return 1;
    }
  }
  else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function SavingTableS() {

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const [savings, setSaving] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatusBase] = useState("");

  const [openAlert, setOpenAlert] = useState(true);

  const [showMore, setShowMore] = useState(false);
  const [item, setItem] = useState("");

  useEffect(() => {
    fetchSaving();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchSaving = async () => {
    if (search === "") {
      try {
        const savingData = await API.graphql(graphqlOperation(listSavings));
        const savingList = savingData.data.listSavings.items;
        console.log('saving data', savingList);
        setSaving(savingList);
        let data = await Promise.all(savings.map(async (saving) => {
          return{
            repeat: saving.repeat
          }
        }));
        console.log(data);
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
      console.log('saving data', savingData);
      const savingList = savingData.data.savingsByOwner.items;
      console.log('saving list', savingList);
      if (savingList.length > 0) {
        setSaving(savingList);
        console.log('savings', savings);
      }
      else {
        setOpenAlert(true);
        setStatusBase("No match found.");
      }
    }
    if (!Array.isArray(savings)){
      console.log('saving not array')
    }
  };



  const handleClick = (event) => {
    event.preventDefault();
    fetchSaving();
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  }



  return (
    <div>
      <TextField
        className="table-search"
        fullWidth
        InputLabelProps={{ shrink: true, }}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton className="table-icon" onClick={handleClick} type="submit">
                <Search />
              </IconButton>
            </InputAdornment>
          )
        }}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search"
        value={search}
        variant="outlined"
      />
      <TableContainer className="table-container">
        <Table stickyHeader>
          <TableHeader
            headCells={columnTitles}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody fetchSaving = {fetchSaving}>
            {stableSort(savings, getComparator(order, orderBy))
              .map((saving) => {
                return (
                  <TableRow hover key={saving.id}>
                    <TableCell align="center">{saving.month}/{saving.day}/{saving.year}</TableCell>
                    <TableCell align="center">{saving.name}</TableCell>
                    <TableCell align="center">${saving.value}</TableCell>
                    <TableCell align="center">{saving.repeat}</TableCell>
                    <TableCell align="center">   
                      <IconButton className="table-icon" onClick={() => {setItem(saving.id); setShowMore(true)}}> 
                        <Info /> 
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      {status 
      ? <SnackbarNotification 
          className="table-snackbar"
          message={status} 
          onClose={handleCloseAlert} 
          open={openAlert} 
          vertical="top"
        /> 
      : null}
      <MoreInformation
        item = {item}
        closeMore={() => setShowMore(!showMore)} 
        openMore={showMore}
      />
    </div>
  );
}

export default SavingTableS;
