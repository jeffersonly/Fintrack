import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';

import { API, graphqlOperation } from "aws-amplify";
import { listSpendings } from '../../graphql/queries';

import TableHeader from './TableHeader';
import { formatDate, stableSort, getComparator } from './TableFunctions';
import './Table.css';

const columnTitles = [
  { id: "date", label: "Date", align: "center", size: "small" },
  { id: "name", label: "Spendings Name", align: "center" },
  { id: "payment", label: "Form of Payment", align: "center", size: "small" },
  { id: "value", label: "Value", align: "center", size: "small", numeric: true },
];

function QuickTransactionTable () {
  
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const [spendings, setSpending] = useState([]);

  useEffect(() => {
    fetchSpending();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchSpending = async () => {
    try {
      const spendingData = await API.graphql(graphqlOperation(listSpendings));
      const spendingList = spendingData.data.listSpendings.items;
      console.log('spending data', spendingList);
      setSpending(spendingList);
    } catch (error) {
      console.log('Error on fetching spending', error)
    }
  };
  
  return (
    <div>
      <Typography className="table-title" align="center">
        Recent Spendings
      </Typography>
      <TableContainer className="table-container">
        <Table stickyHeader>
          <TableHeader
            headCells={columnTitles}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(spendings, getComparator(order, orderBy))
              .map((spending) => {
                return (
                  <TableRow hover key={spending.id}>
                    <TableCell align="center">{formatDate(spending.month, spending.day, spending.year)}</TableCell>
                    <TableCell align="center">{spending.name}</TableCell>
                    <TableCell align="center">{spending.payment}</TableCell>
                    <TableCell align="center">{spending.value}</TableCell>
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

export default QuickTransactionTable;