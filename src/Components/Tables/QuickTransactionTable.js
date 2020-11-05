import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table, TableBody, TableCell, TableContainer, TableRow, Typography 
} from '@material-ui/core';
import TableHeader from './TableHeader';

const useStyles = makeStyles({
  container: {
    maxHeight: 400,
  },
  tableTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    paddingBottom: "15px"
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
})

const columnTitles = [
  { id: "id", label: "ID", align: "center", size: "small" },
  { id: "date", label: "Date", align: "center", size: "small" },
  { id: "transaction", label: "Transaction", align: "center" },
  { id: "pay", label: "Form of Payment", align: "center", size: "small" },
  { id: "amount", label: "Value ($)", align: "center", size: "small", numeric: true },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
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

function QuickTransactionTable ({rows}) {
  
  const classes = useStyles();

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  
  return (
    <div>
      <Typography className={classes.tableTitle} align="center">
        Recent Transactions
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHeader
            classes={classes}
            headCells={columnTitles}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.transaction}</TableCell>
                    <TableCell align="center">{row.pay}</TableCell>
                    <TableCell align="center">{Number(row.amount)}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default QuickTransactionTable;