import React, { useState, useEffect } from 'react';
import {
  Button, Card, Checkbox, FormControl, FormControlLabel, FormGroup,
  FormLabel, IconButton, InputAdornment, Table, TableBody, TableCell,
  TableContainer, TableRow, TextField, Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { ExpandLess, ExpandMore, FilterList, Info, Search } from '@material-ui/icons';
import { Row, Col } from 'react-bootstrap';

import { API, graphqlOperation } from 'aws-amplify';
import { listSavings} from '../../graphql/queries';
import { deleteSaving } from '../../graphql/mutations';

import TableHeader from './TableHeader';
import { formatDate, stableSort, getComparator } from './TableFunctions';
import SnackbarNotification from '../Modals/SnackbarNotification';
import MoreSavingInformation from '../Modals/Saving/MoreSavingInformation';
import ConfirmDelete from '../Modals/ConfirmDelete';
import { getSavingRepeat } from '../Tables/GetRepeatData';
import './Table.css';

const columnTitles = [
  { id: "date", label: "Date", align: "center" },
  { id: "name", label: "Savings Name", align: "center" },
  { id: "value", label: "Value", align: "center", numeric: true },
  { id: "repeat", label: "Repeat", align: "center", style: "d-none d-md-table-cell" },
  { id: "info", label: "More Information", align: "center" },
];

function SavingTable() {
  
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const [savings, setSaving] = useState([]);
  const [load, setLoad] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatusBase] = useState("");
  const [btnFilter, setBtnFilter] = useState(false);

  const [openAlert, setOpenAlert] = useState(true);

  const [showMore, setShowMore] = useState(false);
  const [itemID, setItemID] = useState("");
  const [data, setData] = useState({});
  const [showConfirmDelete, setConfirmDelete] = useState(false);
  const [filter, setFilter] = useState({
    Never: false,
    Weekly: false,
    Monthly: false,
    Yearly: false,
  });

  useEffect(() => {
    let isSubscribed = true;

    fetchSaving().then(result => {
      if (isSubscribed) {
        setSaving(result);
      }
    })

    return () => isSubscribed = false;
  }, [filter]);

  useEffect(() => {
    let isSubscribed = true;
    setLoad(true);
    
    getSavingRepeat().then(function() {
      if (isSubscribed) {
        API.graphql(graphqlOperation(listSavings)).then(result => {
          if (isSubscribed) {
            setSaving(result.data.listSavings.items);
            setLoad(false);
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

  function filtering(list, conditions) {
    for (var i = list.length - 1; i >= 0; i--) {
      for (var cond of conditions) {
        if (list[i].repeat === cond) {
          list.splice(i, 1);
          break;
        }
      }
    }
    return list;
  }

  function fetchFiltered(savingList) {
    if (Never && Weekly && !Monthly && Yearly) {
      return filtering(savingList, ["Monthly", "Repeating monthly"]);
    }
    else if (Never && !Weekly && Monthly && Yearly) {
      return filtering(savingList, ["Weekly", "Repeating weekly"]);
    }
    else if (!Never && Weekly && Monthly && Yearly) {
      return filtering(savingList, ["Never"]);
    }
    else if (Never && Weekly && Monthly && !Yearly) {
      return filtering(savingList, ["Yearly", "Repeating yearly"]);
    }
    else if (!Never && Weekly && Monthly && !Yearly) {
      return filtering(savingList, ["Never", "Yearly", "Repeating yearly"]);
    }
    else if (Never && !Weekly && Monthly && !Yearly) {
      return filtering(savingList, ["Weekly", "Repeating weekly", "Yearly", "Repeating yearly"]);
    }
    else if (Never && !Weekly && !Monthly && Yearly) {
      return filtering(savingList, ["Weekly", "Repeating weekly", "Monthly", "Repeating monthly"]);
    }
    else if (!Never && Weekly && !Monthly && Yearly) {
      return filtering(savingList, ["Never", "Monthly", "Repeating monthly"]);
    }
    else if (!Never && !Weekly && Monthly && Yearly) {
      return filtering(savingList, ["Never", "Weekly", "Repeating weekly"]);
    }
    else if (Never && Weekly && !Monthly && !Yearly) {
      return filtering(savingList, ["Monthly", "Repeating monthly", "Yearly", "Repeating yearly"]);
    }
    else if (Never && !Weekly && !Monthly && !Yearly) {
      return filtering(savingList, ["Weekly", "Repeating weekly", "Monthly", "Repeating monthly", "Yearly", "Repeating yearly"]);
    }
    else if (!Never && Weekly && !Monthly && !Yearly) {
      return filtering(savingList, ["Never", "Monthly", "Repeating monthly", "Yearly", "Repeating yearly"]);
    }
    else if (!Never && !Weekly && Monthly && !Yearly) {
      return filtering(savingList, ["Never", "Weekly", "Repeating weekly", "Yearly", "Repeating yearly"]);
    }
    else if (!Never && !Weekly && !Monthly && Yearly) {
      return filtering(savingList, ["Never", "Weekly", "Repeating weekly", "Monthly", "Repeating monthly"]);
    }
    else {
      return savingList;
    }
  }

  const fetchSaving = async () => {
    const savingData = await API.graphql(graphqlOperation(listSavings));
    const savingList = savingData.data.listSavings.items;

    if (search === "") {
      return fetchFiltered(savingList);
    }
    else {
      let filter = {
        or: [
          {
            name: { contains: search }
          }
        ]
      };

      const savingsData = await API.graphql(graphqlOperation(listSavings, { filter: filter }));
      const savingList = savingsData.data.listSavings.items;
      if (savingList.length > 0) {
        return fetchFiltered(savingList);
      }
      else {
        setOpenAlert(true);
        setStatusBase("No match found.");
        return savingList;
      }
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    fetchSaving().then(result => {
      if (result.length > 0) {
        setSaving(result);
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
    try {
      const id = {
        id: event
      }
      await API.graphql(graphqlOperation(deleteSaving, { input: id }));
      fetchSaving().then(result => {
        setSaving(result);
      })
    }
    catch (error) {
      console.log('Error on delete saving', error);
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
            <Typography variant="button">Repeat</Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={Never} color={'primary'} name="Never" onChange={handleFilter} size="small" />}
              label={<Typography variant="body2">Never</Typography>}
            />
            <FormControlLabel
              control={<Checkbox checked={Weekly} color={'primary'} name="Weekly" onChange={handleFilter} size="small" />}
              label={<Typography variant="body2">Weekly</Typography>}
            />
            <FormControlLabel
              control={<Checkbox checked={Monthly} color={'primary'} name="Monthly" onChange={handleFilter} size="small" />}
              label={<Typography variant="body2">Monthly</Typography>}
            />
            <FormControlLabel
              control={<Checkbox checked={Yearly} color={'primary'} name="Yearly" onChange={handleFilter} size="small" />}
              label={<Typography variant="body2">Yearly</Typography>}
            />
          </FormGroup>
        </FormControl>
      </>
    );
  }

  const { Never, Weekly, Monthly, Yearly } = filter;

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
                helperText="by Savings Name (case-sensitive)"
                InputLabelProps={{ shrink: true }}
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
                      stableSort(savings, getComparator(order, orderBy))
                        .map((saving) => {
                          return (
                            <TableRow hover key={saving.id}>
                              <TableCell align="center">{formatDate(saving.month, saving.day, saving.year)}</TableCell>
                              <TableCell align="center">{saving.name}</TableCell>
                              <TableCell align="center">${saving.value}</TableCell>
                              <TableCell className="d-none d-md-table-cell" align="center">{saving.repeat}</TableCell>
                              <TableCell align="center">
                                <IconButton
                                  className="table-icon"
                                  onClick={() => {
                                    setItemID(saving.id);
                                    setData({
                                      month: saving.month,
                                      day: saving.day,
                                      year: saving.year,
                                      name: saving.name,
                                      value: saving.value,
                                      repeat: saving.repeat,
                                      note: saving.note
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
          <MoreSavingInformation
            closeMore={() => setShowMore(!showMore)}
            confirmDelete={() => setConfirmDelete(true)}
            itemData={data}
            itemID={itemID}
            openMore={showMore}
            update={() => fetchSaving().then(result => {
              setSaving(result);
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

export default SavingTable;