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
  { id: "desc", label: "Savings Name", align: "center", minWidth: 370 },
  { id: "value", label: "Value", align: "center", minWidth: 170 },
];

function SavingTableS () {
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
            saving1
          </TableRow>
          <TableRow>
            saving2
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SavingTableS;