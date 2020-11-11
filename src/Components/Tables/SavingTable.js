import React, { useState, useEffect } from 'react';
import {
  IconButton, InputAdornment, Table, TableBody, TableCell,
  TableContainer, TableRow, TextField, FormControlLabel, FormControl, FormLabel, FormGroup, Checkbox
} from '@material-ui/core';
import { Search, Info } from '@material-ui/icons';

import { API, graphqlOperation } from "aws-amplify";
import { listSavings} from '../../graphql/queries';
import { deleteSaving } from '../../graphql/mutations';
import { Row, Col } from 'react-bootstrap';

import TableHeader from './TableHeader';
import { formatDate, stableSort, getComparator } from './TableFunctions';
import SnackbarNotification from '../Modals/SnackbarNotification';
import MoreSavingInformation from '../Modals/Saving/MoreSavingInformation';
import ConfirmDelete from '../Modals/ConfirmDelete';
import { getSavingRepeat } from '../Tables/GetRepeatData'
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

  const [search, setSearch] = useState("");
  const [status, setStatusBase] = useState("");

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
  })
  var i


  useEffect(() => {
    fetchSaving();
  }, [filter]);

  useEffect(() => {
    getSavingsRepeat();
  }, [])

  async function updateSavingResult() {
    const savingData = await API.graphql(graphqlOperation(listSavings));
    const savingList = savingData.data.listSavings.items;
    setSaving(savingList);
  }

  async function getSavingsRepeat() {
    await getSavingRepeat();
    updateSavingResult()
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchSaving = async () => {
    const savingData = await API.graphql(graphqlOperation(listSavings));
    const savingList = savingData.data.listSavings.items;

    if (search === "") {
      if (Weekly && Never && Monthly && Yearly) {
        setSaving(savingList);
      }
      else if (!Monthly && Never && Weekly && Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Monthly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating monthly") {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (Monthly && !Weekly && Never && Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Weekly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating weekly") {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (Monthly && !Never && Weekly && Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Never") {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (Monthly && Weekly && Never && !Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Yearly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating yearly") {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (Monthly && Weekly && !Never && !Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Never") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Yearly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating yearly") {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (Monthly && Never && !Weekly && !Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Weekly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Yearly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating yearly") {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (!Monthly && Never && !Weekly && Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Weekly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating weekly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Monthly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating monthly") {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (!Monthly && Weekly && !Never && Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Never") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Monthly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating monthly") {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }

      else if (Monthly && !Never && !Weekly && Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Never") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Weekly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating weekly") {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (Weekly && Never && !Monthly && !Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Monthly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating monthly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Yearly") {
            savingList.splice(i, 1)
          }
          else if (savingList[i].repeat === "Repeating yearly") {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (Never && !Weekly && !Monthly && !Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Never") {
          }
          else {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (Weekly && !Monthly && !Never && !Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Weekly") {
          }
          else if (savingList[i].repeat === "Repeating weekly") {
          }
          else {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (Monthly && !Weekly && !Never && !Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Monthly") {
          }
          else if (savingList[i].repeat === "Repeating monthly") {
          }
          else {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else if (!Monthly && !Weekly && !Never && Yearly) {
        for (i = savingList.length - 1; i >= 0; i--) {
          if (savingList[i].repeat === "Yearly") {
          }
          else if (savingList[i].repeat === "Repeating yearly") {
          }
          else {
            savingList.splice(i, 1)
          }
        }
        setSaving([...savingList])
      }
      else {
        setSaving(savingList);
      }
    }
    else {
      /*
      const owner = await Auth.currentAuthenticatedUser();
      const input = {
        owner: owner.username,
        name: {
          beginsWith: search,
        },
      };
      const savingData = await API.graphql(graphqlOperation(savingsByOwner, input));
      const savingList = savingData.data.savingsByOwner.items;
      */
      let filter = {
        or: [
          {name: { contains: search}},
        ]
      };

      const savingsData = await API.graphql(graphqlOperation(listSavings, { filter: filter }));
      const savingList = savingsData.data.listSavings.items;
      if (savingList.length > 0) {
        if (Weekly && Never && Monthly && Yearly) {
          setSaving(savingList);
        }
        else if (!Monthly && Never && Weekly && Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Monthly") {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (Monthly && !Weekly && Never && Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Weekly") {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (Monthly && !Never && Weekly && Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Never") {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (Monthly && Weekly && Never && !Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Yearly") {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (Monthly && Weekly && !Never && !Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Never") {
              savingList.splice(i, 1)
            }
            else if (savingList[i].repeat === "Yearly") {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (Monthly && Never && !Weekly && !Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Weekly") {
              savingList.splice(i, 1)
            }
            else if (savingList[i].repeat === "Yearly") {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (!Monthly && Never && !Weekly && Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Weekly") {
              savingList.splice(i, 1)
            }
            else if (savingList[i].repeat === "Monthly") {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (!Monthly && Weekly && !Never && Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Never") {
              savingList.splice(i, 1)
            }
            else if (savingList[i].repeat === "Monthly") {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }

        else if (Monthly && !Never && !Weekly && Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Never") {
              savingList.splice(i, 1)
            }
            else if (savingList[i].repeat === "Weekly") {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (Weekly && Never && !Monthly && !Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Monthly") {
              savingList.splice(i, 1)
            }
            else if (savingList[i].repeat === "Yearly") {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (Never && !Weekly && !Monthly && !Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Never") {
            }
            else {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (Weekly && !Monthly && !Never && !Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Weekly") {
            }
            else {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (Monthly && !Weekly && !Never && !Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Monthly") {
            }
            else {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else if (!Monthly && !Weekly && !Never && Yearly) {
          for (i = savingList.length - 1; i >= 0; i--) {
            if (savingList[i].repeat === "Yearly") {
            }
            else {
              savingList.splice(i, 1)
            }
          }
          setSaving([...savingList])
        }
        else {
          setSaving(savingList);
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
    fetchSaving();
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
      await API.graphql(graphqlOperation(deleteSaving, { input: id }));
      console.log('Deleted saving')
      updateSavingResult()
      //window.location.reload();
    }
    catch (error) {
      console.log('Error on delete saving', error)
    }
  }

  function handleShowConfirmDelete() {
    setConfirmDelete(true);
  }

  const handleFilter = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
    console.log(filter)
  };

  const { Never, Weekly, Monthly, Yearly } = filter;

  return (
    <div>
      <Row>
        <Col md={1}>
          <h5>Filter</h5>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Repeat</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox color={'default'} checked={Never} onChange={handleFilter} name="Never" />}
                  label="Never"
                />
                <FormControlLabel
                  control={<Checkbox color={'default'} checked={Weekly} onChange={handleFilter} name="Weekly" />}
                  label="Weekly"
                />
                <FormControlLabel
                  control={<Checkbox color={'default'} checked={Monthly} onChange={handleFilter} name="Monthly" />}
                  label="Monthly"
                />
                <FormControlLabel
                  control={<Checkbox color={'default'} checked={Yearly} onChange={handleFilter} name="Yearly" />}
                  label="Yearly"
                />
              </FormGroup>
            </FormControl>
          </div>
        </Col>

        <Col md={11}>
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
                {stableSort(savings, getComparator(order, orderBy))
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
                              //setData([saving.month, saving.day, saving.year, saving.name, saving.value, saving.repeat, saving.note]); 
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
          <MoreSavingInformation
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

export default SavingTable;