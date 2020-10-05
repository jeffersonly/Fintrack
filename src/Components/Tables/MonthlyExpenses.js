import React from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography 
} from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    maxHeight: 380,
    paddingLeft: "80px",
    paddingRight: "70px",
    paddingBottom: "30px"
  },
  tableTitle: {
    fontWeight: "bold",
    fontSize: "16px",
    paddingBottom: "15px"
  },
})

const columnTitles = [
  //{ id: "id", label: "ID", align: "center", size: "small" },
  { id: "date", label: "Due", align: "center", size: "small"},
  { id: "expense", label: "Expense", align: "center"},
  { id: "value", label: "Value ($)", align: "center", size: "small" },
];

function MonthlyExpenses ({rows}) {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.tableTitle} align="center">
        Monthly Expenses
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
              <TableRow>
                {columnTitles.map((title) => (
                  <TableCell key={title.id} align={title.align} size={title.size}>
                    {title.label}
                  </TableCell>
                ))}
              </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                {/*<TableCell align="center">{row.id}</TableCell>*/}
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.expense}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MonthlyExpenses;