import React, { useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { listSpendings } from '../../graphql/queries';
import { formatDate } from './TableFunctions';

const useStyles = makeStyles({
  container: {
    maxHeight: 380,
    paddingLeft: "5.5vw",
    paddingRight: "4.861vw",
    paddingBottom: "30px"
  },
})

const columnTitles = [
  { id: "date", label: "Due", align: "center", size: "small" },
  { id: "expense", label: "Expense", align: "center" },
  { id: "value", label: "Value ($)", align: "center", size: "small" },
];

function MonthlyExpenses() {
  const classes = useStyles();
  const today = new Date();
  const [expense, setExpense] = useState([])

  useEffect(() => {
    async function fetchMonthlyExpenses() {
      try {
        let filter = {
          or: [
            { repeat: { eq: "Monthly" } },
            { repeat: { eq: "Repeating monthly" } },
          ]
        };
        const spendingData = await API.graphql(graphqlOperation(listSpendings, { filter: filter }));
        const spendingList = spendingData.data.listSpendings.items;
        for (var i = spendingList.length - 1; i >= 0; i--) {
          let currMonth = (today.getMonth()+1).toString();
          if (spendingList[i].month !== currMonth) {
            spendingList.splice(i, 1)
          }
        }
        setExpense([...spendingList])
      } catch (error) {
        return "Error getting monthly expenses";
      }
    }

    fetchMonthlyExpenses();
  }, [today])

  return (
    <div>
      <Typography align="center" style={{ fontWeight: "bold", fontSize: "20px", paddingTop: "10px", paddingBottom: "25px" }}>
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
            {expense.map(row => (
              <TableRow key={row.id}>
                <TableCell align="center">{formatDate(row.month, row.day, row.year)}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
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