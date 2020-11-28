import React, { useState, useEffect } from 'react';
import {
  Button, Card, Checkbox, FormControl, FormControlLabel, FormGroup,
  FormLabel, IconButton, InputAdornment, Table, TableBody, 
  TableCell, TableContainer, TableRow, TextField, Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { ExpandLess, ExpandMore, FilterList, Info, Search } from '@material-ui/icons';
import { Row, Col } from 'react-bootstrap';

import { API, graphqlOperation, Storage } from 'aws-amplify';
import { listSpendings} from '../../graphql/queries';
import { deleteSpending } from '../../graphql/mutations';

import TableHeader from './TableHeader';
import { formatDate, stableSort, getComparator } from './TableFunctions';
import SnackbarNotification from '../Modals/SnackbarNotification';
import MoreSpendingInformation from '../Modals/Spending/MoreSpendingInformation';
import ConfirmDelete from '../Modals/ConfirmDelete';
import { getSpendingRepeat } from '../Tables/GetRepeatData'
import './Table.css';

const columnTitles = [
  { id: "date", label: "Date", align: "center" },
  { id: "name", label: "Spending Name", align: "center" },
  { id: "payment", label: "Form of Payment", align: "center", style: "d-none d-md-table-cell" },
  { id: "value", label: "Value", align: "center", numeric: true },
  { id: "category", label: "Category", align: "center", style: "d-none d-md-table-cell" },
  { id: "info", label: "More Information", align: "center" },
];

function SpendingTable() {
  
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const [spendings, setSpending] = useState([]);
  const [load, setLoad] = useState(false);
  const [imageError, setImageError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatusBase] = useState("");
  const [btnFilter, setBtnFilter] = useState(false);

  const [openAlert, setOpenAlert] = useState(true);

  const [showMore, setShowMore] = useState(false);
  const [itemID, setItemID] = useState("");
  const [data, setData] = useState({});
  const [showConfirmDelete, setConfirmDelete] = useState(false);
  const [filter, setFilter] = useState({
    Cash: false,
    Credit: false,
    Debit: false,
  });

  useEffect(() => {
    let isSubscribed = true;

    fetchSpending().then(result => {
      if (isSubscribed) {
        setSpending(result);
      }
    })

    return () => isSubscribed = false;
  }, [filter]);

  useEffect(() => {
    let isSubscribed = true;
    setLoad(true);

    getSpendingRepeat().then(function() {
      if (isSubscribed) {
        API.graphql(graphqlOperation(listSpendings)).then(result => {
          if (isSubscribed) {
            const spendingList = result.data.listSpendings.items;
            fetchImageLink(spendingList).then(function () {
              if (isSubscribed) {
                setSpending(spendingList);
                setLoad(false);
              }
            })
          }
        })
      }
    })

    return () => isSubscribed = false;
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function filteringPayment(list, conditions) {
    for (var i = list.length - 1; i >= 0; i--) {
      for (var cond of conditions) {
        if (list[i].payment === cond) {
          list.splice(i, 1);
          break;
        }
      }
    }
    return list;
  }

  function fetchFilteredPayment(spendingList) {
    if (!Cash && Credit && Debit) {
      return filteringPayment(spendingList, ["Cash"]);
    }
    else if (Cash && Credit && !Debit) {
      return filteringPayment(spendingList, ["Debit"]);
    }
    else if (Cash && !Credit && Debit) {
      return filteringPayment(spendingList, ["Credit"]);
    }
    else if (Cash && !Credit && !Debit) {
      return filteringPayment(spendingList, ["Debit", "Credit"]);
    }
    else if (!Cash && !Credit && Debit) {
      return filteringPayment(spendingList, ["Cash", "Credit"]);
    }
    else if (!Cash &&Credit && !Debit) {
      return filteringPayment(spendingList, ["Cash", "Debit"]);
    }
    else {
      return spendingList;
    }
  }

  // Capitalize first letter of search when searching for category
  function capitalizeSearch(str) {
    if (/^[a-zA-Z]/.test(str)) {     //true if first letter in str is a-z
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    else {
      return str;
    }
  }

  //fetchSpending -> fetchImageLink (adds to List) -> getImageName / getImage -> getImageSrc 
  async function getImage(key) {
    let imageURL = "";
    if (key.startsWith("picture-taken-from-camera-")) {
      let webcamLink = await Storage.get(key, {
        contentType: "text/html",
      });
      await getImageSrc(webcamLink)
        .then(function (result) {
          imageURL = result;
        })
        .catch(function (err) {
          console.log(err);
        })
    }
    else {
      imageURL = await Storage.get(key);
    }
    return imageURL;
  }

  function getImageSrc(imageURL) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', imageURL);
      xhr.responseType = 'text';
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } 
        else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => {
        reject("Something went wrong!");
      }
      xhr.send();
    });
  }

  function getImageName(key) {
    const name = key.split("/");
    return name[1];
  }

  const fetchImageLink = async (list) => {
    //get imageName + url for receipts -> add to spendingList
    for (var i = 0; i < list.length; i++) {
      let url = "";
      let imageName = "";
      if (list[i].file !== null) {
        imageName = getImageName(list[i].file.key);
        try {
          url = await getImage(imageName);
        } catch (err) {
          setImageError(err);
        }
      }
      list[i].url = url;
    }
  } 

  const fetchSpending = async () => {
    if (search === "") {
      try {
        const spendingData = await API.graphql(graphqlOperation(listSpendings));
        const spendingList = spendingData.data.listSpendings.items;
        await fetchImageLink(spendingList);
        return fetchFilteredPayment(spendingList);
      } catch (error) {
        console.log('Error on fetching spending', error);
      }
    }
    else {
      let filter = {
        or: [
          { 
            name: { contains: search } 
          },
          { 
            category: { contains: capitalizeSearch(search) }
          }, 
          {
            category: { contains: search }
          }
        ]
      };
      const spendingData = await API.graphql(graphqlOperation(listSpendings, { filter: filter }));
      const spendingList = spendingData.data.listSpendings.items;
      if (spendingList.length > 0) {
        await fetchImageLink(spendingList);
        return fetchFilteredPayment(spendingList);
      }
      else {
        setOpenAlert(true);
        setStatusBase("No match found.");
        return spendingList;
      }
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    fetchSpending().then(result => {
      if (result.length > 0) {
        setSpending(result);
      }
    })
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  async function handleDelete(event) {
    //delete s3 image
    const spending = await API.graphql(graphqlOperation(listSpendings, {
      filter: {
        id: {
          eq: itemID
        }
      }
    }));
    if (spending.data.listSpendings.items[0].file !== null) {
      const img = getImageName(spending.data.listSpendings.items[0].file.key);
      Storage.remove(img)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
    //delete spending entry
    try {
      const id = {
        id: event
      }
      await API.graphql(graphqlOperation(deleteSpending, { input: id }));
      fetchSpending().then(result => {
        setSpending(result);
      })
    }
    catch (error) {
      console.log('Error on delete spending', error);
    }
  }

  const handleFilter = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
  };

  function renderFilter() {
    return (
      <>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="button">Payment</Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox color={'primary'} checked={Cash} onChange={handleFilter} name="Cash" size="small" />}
              label={<Typography variant="body2">Cash</Typography>}
            />
            <FormControlLabel
              control={<Checkbox color={'primary'} checked={Credit} onChange={handleFilter} name="Credit" size="small" />}
              label={<Typography variant="body2">Credit</Typography>}
            />
            <FormControlLabel
              control={<Checkbox color={'primary'} checked={Debit} onChange={handleFilter} name="Debit" size="small" />}
              label={<Typography variant="body2">Debit</Typography>}
            />
          </FormGroup>
        </FormControl>
      </>
    );
  }

  const { Cash, Credit, Debit } = filter;

  return (
    <div>
      <Row>
        <Col xl={1} className="d-none d-xl-block">
          <Typography variant="subtitle1"><b>Filter</b></Typography>
          {renderFilter()}
        </Col>
        <Col xs={12} xl={11}>
          <Row>
            <Col xs={1} className="d-xl-none table-filter-column">
              <Button
                className="d-none d-md-flex table-filter"
                onClick={() => setBtnFilter(!btnFilter)}
                variant="outlined"
              >
                Filter {btnFilter ? <ExpandLess size="small" /> : <ExpandMore size="small"/>}
              </Button>
              <IconButton
                className="d-md-none table-filter"
                onClick={() => setBtnFilter(!btnFilter)}
              >
                <FilterList />
              </IconButton>
              {
                btnFilter && (
                  <Card className="table-filter-card">
                    {renderFilter()}
                  </Card>
                )
              }
            </Col>
            <Col xs={11} xl={12} className="table-search-column">
              <TextField
                className="table-search"
                fullWidth
                helperText="by Spending Name (case-sensitive) and Category"
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
            </Col>
          </Row>
          <Row>
            {imageError && <p className="table-imageError">{imageError}</p>}
            <TableContainer className="table-container">
              <Table stickyHeader>
                <TableHeader
                  headCells={columnTitles}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {load ? 
                    <TableRow>
                      <TableCell>
                        <Skeleton animation="wave" variant="rect" height={60}/>
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" variant="rect" height={60}/>
                      </TableCell>
                      <TableCell className="d-none d-md-table-cell">
                        <Skeleton animation="wave" variant="rect" height={60}/>
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" variant="rect" height={60}/>
                      </TableCell>
                      <TableCell className="d-none d-md-table-cell">
                        <Skeleton animation="wave" variant="rect" height={60}/>
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" variant="rect" height={60}/>
                      </TableCell>
                    </TableRow>
                    :
                      stableSort(spendings, getComparator(order, orderBy))
                        .map((spending) => {
                          return (
                            <TableRow hover key={spending.id}>
                              <TableCell align="center">{formatDate(spending.month, spending.day, spending.year)}</TableCell>
                              <TableCell align="center">{spending.name}</TableCell>
                              <TableCell className="d-none d-md-table-cell" align="center">{spending.payment}</TableCell>
                              <TableCell align="center">${spending.value}</TableCell>
                              <TableCell className="d-none d-md-table-cell" align="center">{spending.category}</TableCell>
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
                                      note: spending.note,
                                      url: spending.url,
                                    })
                                    setShowMore(true);
                                  }}>
                                  <Info />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Row>
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
            confirmDelete={() => setConfirmDelete(true)}
            itemData={data}
            itemID={itemID}
            openMore={showMore}
            update={() => fetchSpending().then(result => {
              setSpending(result);
            })}
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