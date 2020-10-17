import React from 'react';
import styled from 'styled-components';
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
  { id: "date", label: "Due", align: "center", minWidth: 10 },
  { id: "desc", label: "Expense", align: "center", minWidth: 70 },
  { id: "value", label: "Value", align: "center", minWidth: 10 },
];

function MonthlyExpenses () {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableTitle}>
            Monthly Expenses
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MonthlyExpenses;