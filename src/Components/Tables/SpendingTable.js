import React, { useState, useEffect } from 'react';
import {
  IconButton, InputAdornment, Table, TableBody, TableCell,
  TableContainer, TableRow, TextField, FormControlLabel, FormControl, FormLabel, FormGroup, Checkbox
} from '@material-ui/core';
import { Search, Info } from '@material-ui/icons';

import { API, graphqlOperation } from "aws-amplify";
import { listSpendings} from '../../graphql/queries';
import { deleteSpending } from '../../graphql/mutations';

import TableHeader from './TableHeader';
import { formatDate, stableSort, getComparator } from './TableFunctions';
import SnackbarNotification from '../Modals/SnackbarNotification';
import MoreSpendingInformation from '../Modals/Spending/MoreSpendingInformation';
import ConfirmDelete from '../Modals/ConfirmDelete';
import { getSpendingRepeat } from '../Tables/GetRepeatData'
import { Row, Col } from 'react-bootstrap';
import './Table.css';

const columnTitles = [
  { id: "date", label: "Date", align: "center" },
  { id: "name", label: "Spendings Name", align: "center" },
  { id: "payment", label: "Form of Payment", align: "center", style: "d-none d-md-table-cell" },
  { id: "value", label: "Value", align: "center", numeric: true },
  { id: "category", label: "Category", align: "center", style: "d-none d-md-table-cell" },
  { id: "info", label: "More Information", align: "center" },
];

function SpendingTable() {

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const [spendings, setSpending] = useState([])

  const [search, setSearch] = useState("");
  const [status, setStatusBase] = useState("");

  const [openAlert, setOpenAlert] = useState(true);

  const [showMore, setShowMore] = useState(false);
  const [itemID, setItemID] = useState("");
  const [data, setData] = useState({});
  const [showConfirmDelete, setConfirmDelete] = useState(false);
  const [filter, setFilter] = useState({
    Cash: false,
    Credit: false,
    Debit: false,
  })
  var  i


  useEffect(() => {
    fetchSpending();
  }, [filter]);

  useEffect(() => {
    getSpendingsRepeat();
  }, [])

  async function updateSpendingsResult() {
    const spendingData = await API.graphql(graphqlOperation(listSpendings));
    const spendingList = spendingData.data.listSpendings.items;
    setSpending(spendingList);
  }

  async function getSpendingsRepeat() {
    await getSpendingRepeat();
    updateSpendingsResult();
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const fetchSpending = async () => {
    const spendingData = await API.graphql(graphqlOperation(listSpendings));
    const spendingList = spendingData.data.listSpendings.items;

    if (search === "") {
      if (Debit && Cash && Credit) {
        setSpending(spendingList);
      }
      else if (Credit && Debit && !Cash) {
        for (i = spendingList.length - 1; i >= 0; i--) {
          if (spendingList[i].payment === "Debit") {
          }
          else if (spendingList[i].payment === "Credit") {
          }
          else {
            spendingList.splice(i, 1)
          }
        }
        setSpending([...spendingList])
      }
      else if (Credit && Cash && !Debit) {
        for (i = spendingList.length - 1; i >= 0; i--) {
          if (spendingList[i].payment === "Cash") {
          }
          else if (spendingList[i].payment === "Credit") {
          }
          else {
            spendingList.splice(i, 1)
          }
        }
        setSpending([...spendingList])
      }
      else if (Debit && Cash && !Credit) {
        for ( i = spendingList.length - 1; i >= 0; i--) {
          if (spendingList[i].payment === "Cash") {
          }
          else if (spendingList[i].payment === "Debit") {
          }
          else {
            spendingList.splice(i, 1)
          }
        }
        setSpending([...spendingList])
      }
      else if (Cash && !Debit && !Credit) {
        for ( i = spendingList.length - 1; i >= 0; i--) {
          //console.log(spendingList[i])
          if (spendingList[i].payment === "Cash") {
          }
          else {
            spendingList.splice(i, 1)
          }
        }
        setSpending([...spendingList])
      }
      else if (Debit && !Credit && !Cash) {
        for ( i = spendingList.length - 1; i >= 0; i--) {
          //console.log(spendingList[i])
          if (spendingList[i].payment === "Debit") {
          }
          else {
            spendingList.splice(i, 1)
          }
        }
        setSpending([...spendingList])
      }
      else if (Credit && !Debit && !Cash) {
        for ( i = spendingList.length - 1; i >= 0; i--) {
          if (spendingList[i].payment === "Credit") {
          }
          else {
            spendingList.splice(i, 1)
          }
        }
        setSpending([...spendingList])
      }

      else {
        setSpending(spendingList);
      }
    }
    else if (search.toLowerCase() === "Banking".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Banking") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Clothing".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Clothing") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Education".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Education") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Entertainment".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Entertainment") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Food".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Food") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Housing".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Housing") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Insurance".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Insurance") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Medical".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Medical/Health Care") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Personal".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Personal") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Transportation".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Transportation") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Utilities".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Utilities") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else if (search.toLowerCase() === "Other".toLowerCase()) {
      for ( i = spendingList.length - 1; i >= 0; i--) {
        if (spendingList[i].category === "Other") {
        }
        else {
          spendingList.splice(i, 1)
        }
      }
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      setSpending([...spendingList])
    }
    else {
      /*
      const owner = await Auth.currentAuthenticatedUser();
      const input = {
        owner: owner.username,
        name: {
          contains: search,
        },
      };
      const spendingData = await API.graphql(graphqlOperation(spendingsByOwner, input));
      const spendingList = spendingData.data.spendingsByOwner.items;
      */
      let filter = {
        name: {
          contains: search,
        },
      };
      const spendingData = await API.graphql(graphqlOperation(listSpendings, { filter: filter }));
      const spendingList = spendingData.data.listSpendings.items;
      if (spendingList.length > 0) {
        if (Debit && Cash && Credit) {
          setSpending(spendingList);
        }
        if (Credit && Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Debit") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && Cash && !Debit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && Cash && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            if (spendingList[i].payment === "Cash") {
            }
            else if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Cash && !Debit && !Credit) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Cash") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Debit && !Credit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            //console.log(spendingList[i])
            if (spendingList[i].payment === "Debit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }
        else if (Credit && !Debit && !Cash) {
          for ( i = spendingList.length - 1; i >= 0; i--) {
            console.log(spendingList[i])
            if (spendingList[i].payment === "Credit") {
            }
            else {
              spendingList.splice(i, 1)
            }
          }
          setSpending([...spendingList])
        }

        else {
          setSpending(spendingList);
        }
      }
      else {
        setOpenAlert(true);
        setStatusBase("No match found.");
      }
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    fetchSpending();
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  }

  async function handleDelete(event) {
    try {
      const id = {
        id: event
      }
      await API.graphql(graphqlOperation(deleteSpending, { input: id }));
      console.log('Deleted spending')
      const spendingData = await API.graphql(graphqlOperation(listSpendings));
      const spendingList = spendingData.data.listSpendings.items;
      setSpending(spendingList)
      //window.location.reload();
    }
    catch (error) {
      console.log('Error on delete spending', error)
    }
  }

  function handleShowConfirmDelete() {
    setConfirmDelete(true);
    updateSpendingsResult()
  }

  const handleFilter = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
    console.log(filter)
  };

  const { Cash, Credit, Debit } = filter;

  return (
    <div>
      <Row>
        {/**/}
        <Col md={2}>
          <h5>Filter</h5>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Payment</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox color={'default'} checked={Cash} onChange={handleFilter} name="Cash" />}
                  label="Cash"
                />
                <FormControlLabel
                  control={<Checkbox color={'default'} checked={Credit} onChange={handleFilter} name="Credit" />}
                  label="Credit"
                />
                <FormControlLabel
                  control={<Checkbox color={'default'} checked={Debit} onChange={handleFilter} name="Debit" />}
                  label="Debit"
                />
              </FormGroup>
            </FormControl>
          </div>
        </Col>

        <Col md={10}>
          <TextField
            className="table-search"
            fullWidth
            InputLabelProps={{ shrink: true, }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton className="table-icon" onClick={handleClick} type="submit">
                    <Search />
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            value={search}
            variant="outlined"
          />
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
                        <TableCell align="center">${spending.value}</TableCell>
                        <TableCell align="center">{spending.category}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            className="table-icon"
                            onClick={() => {
                              setItemID(spending.id);
                              setData({
                                month: spending.month,
                                day: spending.day,
                                year: spending.year,
                                name: spending.name,
                                payment: spending.payment,
                                value: spending.value,
                                category: spending.category,
                                repeat: spending.repeat,
                                note: spending.note
                              })
                              setShowMore(true);
                            }}>
                            <Info />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
          {
            status ?
              <SnackbarNotification
                className="table-snackbar"
                message={status}
                onClose={handleCloseAlert}
                open={openAlert}
                vertical="top"
              />
              : null
          }
          <MoreSpendingInformation
            closeMore={() => setShowMore(!showMore)}
            confirmDelete={() => handleShowConfirmDelete()}
            itemData={data}
            itemID={itemID}
            openMore={showMore}
          />
          <ConfirmDelete
            closeConfirmDelete={() => {
              setConfirmDelete(false);
              setShowMore(true);
            }}
            confirmed={() => {
              setConfirmDelete(false);
              handleDelete(itemID);
            }}
            openConfirmDelete={showConfirmDelete}
          />
        </Col>
      </Row>
    </div>
  );
}

export default SpendingTable;