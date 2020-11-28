import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { listSplitEvens } from '../../../graphql/queries';
import TableHeader from '../../Tables/TableHeader';
import { formatDate, stableSort, getComparator } from '../../Tables/TableFunctions';

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
    let isSubscribed = true;

    async function getSplitEven() {
      try {
        const splitEvenData = await API.graphql(graphqlOperation(listSplitEvens));
        const list = splitEvenData.data.listSplitEvens.items;
        return list;
      } catch (error) {
        console.log(error);
      }
    }

    getSplitEven().then(list => {
      if (isSubscribed) {
        setItems(list);
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
    <TableContainer className="table-splititem">
      <Table stickyHeader>
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
  )
}

export default AccountEvenTable;