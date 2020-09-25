import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  TableContainer, Table, TableRow, TableCell, TableHead, TableBody 
} from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
  tableTitle: {
    fontWeight: "bold",
    fontSize: "20px",
  },
})

const columns = [
  { id: "date", label: "Date", align: "center", minWidth: 170 },
  { id: "desc", label: "Transaction", align: "center", minWidth: 370 },
  { id: "value", label: "Value", align: "center", minWidth: 170 },
];

function TransactionTable () {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableTitle}>
            Recent Transactions
          </TableRow>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            transaction1
          </TableRow>
          <TableRow>
            transaction2
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionTable;