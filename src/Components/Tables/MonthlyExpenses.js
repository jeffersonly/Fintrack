import React, { useState, useEffect }  from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { listSpendings } from '../../graphql/queries';
import { formatDate, stableSort, getComparator } from './TableFunctions';
import TableHeader from './TableHeader';

const useStyles = makeStyles({
  container: {
    maxHeight: 380,
    paddingLeft: "5.5vw",
    paddingRight: "4.861vw",
    paddingBottom: "30px"
  },
});

const columnTitles = [
  { id: "date", label: "Date", align: "center", size: "small" },
  { id: "expense", label: "Spending Name", align: "center" },
  { id: "value", label: "Value", align: "center", size: "small" },
];

function MonthlyExpenses() {

  const classes = useStyles();

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    async function fetchMonthlyExpenses() {
      const today = new Date();
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
            spendingList.splice(i, 1);
          }
        }
        return spendingList;
      } catch (error) {
        return "Error getting monthly expenses";
      }
    }

    fetchMonthlyExpenses().then(list => {
      if (isSubscribed) {
        setExpense(list);
      }
    })
    
    return () => isSubscribed = false;
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div>
      <Typography align="center" style={{ fontWeight: "bold", fontSize: "20px", paddingTop: "10px", paddingBottom: "25px" }}>
        Monthly Spendings
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHeader
            headCells={columnTitles}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(expense, getComparator(order, orderBy))
              .map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell align="center">{formatDate(row.month, row.day, row.year)}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">${row.value}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MonthlyExpenses;