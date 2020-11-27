import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import { API, graphqlOperation } from "aws-amplify";
import { listSpendings } from '../../graphql/queries';
import TableHeader from './TableHeader';
import { formatDate, stableSort, getComparator } from './TableFunctions';
import QuickTransaction from '../Modals/Spending/QuickTransaction';
import './Table.css';
import '../Graphs/Graphs.css';

const columnTitles = [
  { id: "date", label: "Date", align: "center" },
  { id: "name", label: "Spending Name", align: "center" },
  { id: "payment", label: "Form of Payment", align: "center", style: "d-none d-md-block" },
  { id: "value", label: "Value", align: "center", numeric: true },
];

function QuickTransactionTable () {

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const [recent, setRecent] = useState([]);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    const getMostRecent = async () => {
      try {
        const spendingData = await API.graphql(graphqlOperation(listSpendings));
        const spendingList = spendingData.data.listSpendings.items;
        if (spendingList.length < 6){
          return spendingList;
        } 
        else {
          const sorted = stableSort(spendingList, getComparator(order, orderBy));
          const mostRecent = [sorted[0], sorted[1], sorted[2], sorted[3], sorted[4], sorted[5]];
          return mostRecent;
        }
      } catch (error) {
        console.log('Error on fetching spending', error);
      }
    };

    getMostRecent().then(list => {
      if (isSubscribed) {
        setRecent(list);
      }
    })

    return() => isSubscribed = false;
  }, [order, orderBy]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div>
      <div>
        <Typography align="center" style={{fontWeight: "bold", fontSize: "20px", paddingTop: "10px"}}>
          <b>Recent Spendings</b>
        </Typography>
        <Typography className="graphs-table-subtitle" align="center">
            **Based on Date of Spending
        </Typography>
      </div>
      <TableContainer className="table-quicktransaction">
        <Table stickyHeader size="small">
          <TableHeader
            headCells={columnTitles}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(recent, getComparator(order, orderBy))
              .map((spending) => {
                return (
                  <TableRow hover key={spending.id}>
                    <TableCell align="center">{formatDate(spending.month, spending.day, spending.year)}</TableCell>
                    <TableCell align="center">{spending.name}</TableCell>
                    <TableCell className="d-none d-md-block" align="center">{spending.payment}</TableCell>
                    <TableCell align="center">${spending.value}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div align="center">
        <Button 
          className="table-quicktransaction-button"
          onClick={() => setAdd(true)}
        >
          + Create
        </Button>
      </div>
      <QuickTransaction 
        closeQuick={() => setAdd(!add)}
        openQuick={add}
      />
    </div>
  );
}

export default QuickTransactionTable;