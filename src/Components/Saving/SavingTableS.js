import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  TableContainer, Table, TableRow, TableCell, TableHead, TableBody 
} from '@material-ui/core';
import {API, graphqlOperation} from "aws-amplify";
import {listSavings} from '../../src/graphql/queries';

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
  tableTitle: {
    fontWeight: "bold",
    fontSize: "20px",
  },
})

const columns = [
  { id: "date", label: "Date", align: "center", minWidth: 50 },
  { id: "name", label: "Savings Name", align: "center", minWidth: 150 },
  { id: "value", label: "Value", align: "center", minWidth: 100 },
  { id: "repeat", label: "Repeat", align: "center", minWidth: 100 },
  { id: "note", label: "Notes", align: "center", minWidth: 150 },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'saving'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function SavingTableS ({rows}) {
  const [savings, setSaving] = useState([]);
  useEffect(() => {
    fetchSaving();
  }, []);
  const fetchSaving = async () => {
    try{
      const savingData = await API.graphql(graphqlOperation(listSavings));
      const savingList = savingData.data.listSavings.items;
      console.log('saving list', savingList);
      setSaving(savingList)
    } catch (error){
      console.log('Error on fetching saving', error)
    }
  };

  const classes = useStyles();
  const [order, setOrder] = useState('saving');
  const [orderBy, setOrderBy] = useState('date');
  return (
    <TableContainer className={classes.container}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
            {savings.map((saving) => {
                return (
                  <TableRow hover key={saving.id}>
                    <TableCell align="center">{saving.date}</TableCell>
                    <TableCell align="center">{saving.name}</TableCell>
                    <TableCell align="center">${saving.value}</TableCell>
                    <TableCell align="center">{saving.repeat}</TableCell>
                    <TableCell align="center">{saving.note}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SavingTableS;