import React, { useState, useEffect } from 'react';
import { 
  IconButton, InputAdornment, Table, TableBody, TableCell, 
  TableContainer, TableRow, TextField 
} from '@material-ui/core';
import { Search, Info } from '@material-ui/icons';
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listSpendings, spendingsByOwner } from '../../graphql/queries';
import TableHeader from './TableHeader';
import SnackbarNotification from '../Modals/SnackbarNotification';
import MoreSpendingInfo from '../Modals/MoreSpendingInfo';
import '../Tables/Table.css';

const columnTitles = [
  { id: "date", label: "Date", align: "center", minWidth: 50 },
  { id: "name", label: "Spending", align: "center", minWidth: 150 },
  { id: "value", label: "Value", align: "center", minWidth: 100, numeric: true },
  { id: "category", label: "Category", align: "center", minWidth: 100 },
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
                    <TableCell align="center">{spending.month}/{spending.day}/{spending.year}</TableCell>
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
      {status 
      ? <SnackbarNotification 
          className="table-snackbar"
          message={status} 
          onClose={handleCloseAlert} 
          open={openAlert} 
          vertical="top"
        /> 
      : null}
      <MoreSpendingInfo
       closeMore={() => setShowMore(!showMore)} 
       itemData={data}
       itemID={itemID}
       openMore={showMore}
      />
    </div>
);
}

export default SpendingTable;