import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table, TableBody, TableCell, TableContainer, TableRow, Typography 
} from '@material-ui/core';
import TableHeader from '../Tables/TableHeader';

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
  { id: "name", label: "Name", align: "center" },
  { id: "item", label: "Number of Items", align: "center", size: "small" },
  { id: "amount", label: "Value ($)", align: "center", size: "small" },
];

function SplitItemTable ({rows}) {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.tableTitle} align="center">
        Receipt
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHeader
            classes={classes}
            headCells={columnTitles}
          />
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.item}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
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

export default SplitItemTable;