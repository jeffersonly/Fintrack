import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { API, graphqlOperation } from "aws-amplify";
import { listSplitEvens } from '../../../graphql/queries';
import TableHeader from '../../Tables/TableHeader';
import { formatDate, stableSort, getComparator } from '../../Tables/TableFunctions';
import '../../Tables/Table.css';
import '../../Graphs/Graphs.css';

const columnTitles = [
  { id: "date", label: "Date", align: "center" },
  { id: "size", label: "Party Size", align: "center", numeric: true },
  { id: "total", label: "Bill Total", align: "center", numeric: true },
  { id: "tax", label: "Tax", align: "center", numeric: true },
  { id: "tip", label: "Tip", align: "center", numeric: true },
  { id: "result", label: "Per Person", align: "center", numeric: true },
];

function AccountEvenTable() {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [items, setItems] = useState([]);

  useEffect(() => {
    getSplitEven();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getSplitEven = async () => {
    try {
      const splitEvenData = await API.graphql(graphqlOperation(listSplitEvens));
      const list = splitEvenData.data.listSplitEvens.items;
      setItems(list);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TableContainer className="table-quicktransaction">
        <Table stickyHeader size="small">
          <TableHeader
            headCells={columnTitles}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(items, getComparator(order, orderBy))
              .map((split) => {
                return (
                  <TableRow hover key={split.id}>
                    <TableCell align="center">{formatDate(split.month, split.day, split.year)}</TableCell>
                    <TableCell align="center">{split.size}</TableCell>
                    <TableCell align="center">${split.total}</TableCell>
                    <TableCell align="center">{split.tax}%</TableCell>
                    <TableCell align="center">{split.tip}%</TableCell>
                    <TableCell align="center">${split.evenSplit}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AccountEvenTable;