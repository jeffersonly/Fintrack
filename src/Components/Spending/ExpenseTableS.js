import React from 'react';
//import styled from 'styled-components';
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
  { id: "date", label: "Date", align: "center", minWidth: 120 },
  { id: "exp", label: "Expense Name", align: "center", minWidth: 320 },
  { id: "value", label: "Value", align: "center", minWidth: 170 },
  { id: "paid", label: "Paid?", align: "center", minWidth: 100 },
];

function ExpenseTableS () {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container}>
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

export default ExpenseTableS;