import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { API, graphqlOperation } from "aws-amplify";
import { listSplitItems } from '../../../graphql/queries';
import TableHeader from '../../Tables/TableHeader';
import { formatDate, stableSort, getComparator } from '../../Tables/TableFunctions';
import '../../Tables/Table.css';
import '../../Graphs/Graphs.css';

const columnTitles = [
  { id: "date", label: "Date", align: "center" },
  { id: "tax", label: "Tax", align: "center", numeric: true },
  { id: "tip", label: "Tip", align: "center", numeric: true },
  { id: "names", label: "Names", align: "center", numeric: true },
  { id: "total", label: "Subtotal", align: "center", numeric: true },
  { id: "split", label: "Total", align: "center", numeric: true },
];

function AccountEvenTable() {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [items, setItems] = useState([]);

  useEffect(() => {
    getSplitItem();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getSplitItem = async () => {
    try {
      const splitItemData = await API.graphql(graphqlOperation(listSplitItems));
      const list = splitItemData.data.listSplitItems.items;
      /**/
      for (var i = 0; i < list.length; i++){
        list[i].names = (list[i].names).split(" ").join("\n")
        list[i].total = (list[i].total).split(" ").join("\n")
        list[i].split = (list[i].split).split(" ").join("\n")
      }
      console.log(list);
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
          <TableBody className="withpre">
            {stableSort(items, getComparator(order, orderBy))
              .map((split) => {
                return (
                  <TableRow hover key={split.id}>
                    <TableCell align="center">{formatDate(split.month, split.day, split.year)}</TableCell>
                    <TableCell align="center">{split.tax}%</TableCell>
                    <TableCell align="center">{split.tip}%</TableCell>
                    <TableCell align="center" >{split.names}</TableCell>
                    <TableCell align="center">{split.total}</TableCell>
                    <TableCell align="center">{split.split}</TableCell>
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