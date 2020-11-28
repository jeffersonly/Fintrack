import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableHeader from './TableHeader';
import { stableSort, getComparator } from './TableFunctions';
import './Table.css';

const columnTitles = [
  { id: "name", label: "Name" },
  { id: "item", label: "Item" },
  { id: "value", label: "Price" },
];

function SplitItemTable ({entries}) {

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer className="table-split">
      <Table stickyHeader>
        <TableHeader
          headCells={columnTitles}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(entries, getComparator(order, orderBy))
            .map((entry) => {
              return (
                <TableRow hover key={entry.id}>
                  <TableCell align="center">{entry.name}</TableCell>
                  <TableCell align="center">{entry.item}</TableCell>
                  <TableCell align="center">${entry.value}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SplitItemTable;