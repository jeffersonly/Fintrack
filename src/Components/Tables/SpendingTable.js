import React, { useState, useEffect } from 'react';
import { 
  IconButton, InputAdornment, Table, TableBody, TableCell, 
  TableContainer, TableRow, TextField 
} from '@material-ui/core';
import { Search, Info } from '@material-ui/icons';

import { Auth, API, graphqlOperation } from "aws-amplify";
import { listSpendings, spendingsByOwner } from '../../graphql/queries';
import { deleteSpending } from '../../graphql/mutations';

import TableHeader from './TableHeader';
import { formatDate, stableSort, getComparator } from './TableFunctions';
import SnackbarNotification from '../Modals/SnackbarNotification';
import MoreSpendingInformation from '../Modals/MoreSpendingInformation';
import ConfirmDelete from '../Modals/ConfirmDelete';
import './Table.css';

const columnTitles = [
  { id: "date", label: "Date", align: "center", width: 50 },
  { id: "name", label: "Spendings Name", align: "center", width: 200 },
  { id: "value", label: "Value", align: "center", width: 100, numeric: true },
  { id: "category", label: "Category", align: "center", width: 150 },
  { id: "info", label: "More Information", align: "center", width: 50 },
];

function SpendingTable() {

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const [spendings, setSpending] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatusBase] = useState("");

  const [openAlert, setOpenAlert] = useState(true);

  const [showMore, setShowMore] = useState(false);
  const [itemID, setItemID] = useState("");
  const [data, setData] = useState({});
  const [showConfirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetchSpending();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchSpending = async () => {
    if (search === "") {
      try {
        const spendingData = await API.graphql(graphqlOperation(listSpendings));
        const spendingList = spendingData.data.listSpendings.items;
        console.log('spending data', spendingList);
        setSpending(spendingList);
      } catch (error) {
        console.log('Error on fetching spending', error)
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
      const spendingData = await API.graphql(graphqlOperation(spendingsByOwner, input));
      console.log('spending data', spendingData);
      const spendingList = spendingData.data.spendingsByOwner.items;
      console.log('spending list', spendingList);
      if (spendingList.length > 0) {
        setSpending(spendingList);
        console.log('spendings', spendings);
      }
      else {
        setOpenAlert(true);
        setStatusBase("No match found.");
      }
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    fetchSpending();
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  }

  async function handleDelete(event) {
    try {
      const id = {
        id: event
      }
      await API.graphql(graphqlOperation(deleteSpending, { input: id }));
      console.log('Deleted spending')
      window.location.reload();
    }
    catch (error) {
      console.log('Error on delete spending', error)
    }
  }

  function handleShowConfirmDelete() {
    setConfirmDelete(true);
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
          <TableBody>
            {stableSort(spendings, getComparator(order, orderBy))
              .map((spending) => {
                return (
                  <TableRow hover key={spending.id}>
                    <TableCell align="center">{formatDate(spending.month, spending.day, spending.year)}</TableCell>
                    <TableCell align="center">{spending.name}</TableCell>
                    <TableCell align="center">${spending.value}</TableCell>
                    <TableCell align="center">{spending.category}</TableCell>
                    <TableCell align="center">   
                    <IconButton 
                        className="table-icon" 
                        onClick={() => {
                          setItemID(spending.id);
                          setData({
                            month: spending.month,
                            day: spending.day,
                            year: spending.year,
                            name: spending.name,
                            value: spending.value,
                            category: spending.category,
                            repeat: spending.repeat,
                            note: spending.note
                          })
                          setShowMore(true);
                        }}> 
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
      {
        status ?
          <SnackbarNotification 
            className="table-snackbar"
            message={status} 
            onClose={handleCloseAlert} 
            open={openAlert} 
            vertical="top"
          /> 
        : null
      }
      <MoreSpendingInformation
       closeMore={() => setShowMore(!showMore)} 
       confirmDelete={() => handleShowConfirmDelete()} 
       itemData={data}
       itemID={itemID}
       openMore={showMore}
      />
      <ConfirmDelete
        closeConfirmDelete={() => {
          setConfirmDelete(false);
          setShowMore(true);
        }}
        confirmed={() => {
          setConfirmDelete(false);
          handleDelete(itemID);
        }}
        openConfirmDelete={showConfirmDelete} 
      />
    </div>
  );
}

export default SpendingTable;