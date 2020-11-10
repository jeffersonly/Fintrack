import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography 
} from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    maxHeight: 380,
    paddingLeft: "5.5vw",
    paddingRight: "4.861vw",
    paddingBottom: "30px"
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
      <Typography align="center" style={{fontWeight: "bold", fontSize: "20px", paddingTop: "10px", paddingBottom: "25px"}}>
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