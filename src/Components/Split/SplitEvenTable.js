import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
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
  { id: "SETotal", label: "Total Bill", align: "center" },
  { id: "SEMembers", label: "Party Size", align: "center", size: "small" },
  { id: "SEIndividualTip", label: "Individual Tip", align: "center", size: "small" },
  { id: "SESplitWithoutTip", label: "Split (Without Tip)", align: "center", size: "small" },
  { id: "SESplitWithTip", label: "Split (With Tip)", align: "center", size: "small" },
];

function SplitEvenTable ({rows}) {
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
                  <TableCell align="center">{row.SETotal}</TableCell>
                  <TableCell align="center">{row.SEMembers}</TableCell>
                  <TableCell align="center">{row.SEIndividualTip}</TableCell>
                  <TableCell align="center">{row.SESplitWithoutTip}</TableCell>
                  <TableCell align="center">{row.SESplitWithTip}</TableCell>
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

export default SplitEvenTable;