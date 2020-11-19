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
  { id: "name", label: "Spendings Name", align: "center" },
  { id: "payment", label: "Form of Payment", align: "center", style: "d-none d-md-block" },
  { id: "value", label: "Value", align: "center", numeric: true },
];

function QuickTransactionTable () {
  
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const [recent, setRecent] = useState([]);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    getMostRecent();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getMostRecent = async () => {
    try {
      const spendingData = await API.graphql(graphqlOperation(listSpendings));
      //const test = await API.graphql(graphqlOperation(sortByDate, {limit: 6}));
      //console.log("new test", test);
      const spendingList = spendingData.data.listSpendings.items;
      console.log('spending data', spendingList);
      if (spendingList.length < 6){
        setRecent(spendingList);
      } 
      else {
      const sorted = stableSort(spendingList, getComparator(order, orderBy));
      const mostRecent = [sorted[0], sorted[1], sorted[2], sorted[3], sorted[4], sorted[5]];
      setRecent(mostRecent);
      }
    } catch (error) {
      console.log('Error on fetching spending', error);
    }
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