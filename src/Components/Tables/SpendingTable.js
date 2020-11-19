import React, { useState, useEffect } from 'react';
import {
  Button, Card, Checkbox, FormControl, FormControlLabel, FormGroup,
  FormLabel, IconButton, InputAdornment, Link, Table, TableBody, 
  TableCell, TableContainer, TableRow, TextField, Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore, FilterList, Info, Search } from '@material-ui/icons';
import { Row, Col, Modal } from 'react-bootstrap';

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
  { id: "name", label: "Spendings Name", align: "center" },
  { id: "payment", label: "Form of Payment", align: "center", style: "d-none d-md-table-cell" },
  { id: "value", label: "Value", align: "center", numeric: true },
  { id: "category", label: "Category", align: "center", style: "d-none d-md-table-cell" },
  //{ id: "receipt", label: "Uploaded Receipt", align: "center", style: "d-none d-md-table-cell" },
  { id: "info", label: "More Information", align: "center" },
];

function SpendingTable() {

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const [spendings, setSpending] = useState([]);
  const [imageError, setImageError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatusBase] = useState("");
  const [btnFilter, setBtnFilter] = useState(false);
  //const [webcamPic, setWebcamPic] = useState(false);
  //const [dropzonePic, setDropzonePic] = useState(false);

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
    fetchSpending();
  }, [filter]);

  useEffect(() => {
    getSpendingsRepeat();
  }, []);

  async function updateSpendingsResult() {
    const spendingData = await API.graphql(graphqlOperation(listSpendings));
    const spendingList = spendingData.data.listSpendings.items;
    await fetchImageLink(spendingList);
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
      setSpending(filteringPayment(spendingList, ["Cash"]));
    }
    else if (Cash && Credit && !Debit) {
      setSpending(filteringPayment(spendingList, ["Debit"]));
    }
    else if (Cash && !Credit && Debit) {
      setSpending(filteringPayment(spendingList, ["Credit"]));
    }
    else if (Cash && !Credit && !Debit) {
      setSpending(filteringPayment(spendingList, ["Debit", "Credit"]));
    }
    else if (!Cash && !Credit && Debit) {
      setSpending(filteringPayment(spendingList, ["Cash", "Credit"]));
    }
    else if (!Cash &&Credit && !Debit) {
      setSpending(filteringPayment(spendingList, ["Cash", "Debit"]));
    }
    else {
      setSpending(spendingList);
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
      console.log(webcamLink);
      await getImageSrc(webcamLink)
        .then(function (result) {
          //console.log(result);
          imageURL = result;
        })
        .catch(function (err) {
          console.log(err);
        })
      /*getImageSrc(webcamLink, (err, data) => {
        if (err !== null) {
          console.log(err);
        }
        else {
          console.log(data);
          return data;
        }
      });*/
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
      //list[i].imageName = imageName;
    }
  } 

  const fetchSpending = async () => {
    if (search === "") {
      try {
        const spendingData = await API.graphql(graphqlOperation(listSpendings));
        const spendingList = spendingData.data.listSpendings.items;
        await fetchImageLink(spendingList);
        fetchFilteredPayment(spendingList);
        console.log(spendingList);
      } catch (error) {
        console.log('Error on fetching spending', error);
      }
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
      //const test = capitalizeSearch(search);
      //console.log(test);
      const spendingData = await API.graphql(graphqlOperation(listSpendings, { filter: filter }));
      const spendingList = spendingData.data.listSpendings.items;
      if (spendingList.length > 0) {
        await fetchImageLink(spendingList);
        fetchFilteredPayment(spendingList);
      }
      else {
        setOpenAlert(true);
        setStatusBase("No match found.");
      }
    }
  };

  /*function handleShowWebcam() {
    setWebcamPic(true);
    setDropzonePic(false);
  }

  function handleShowDropzone() {
    setWebcamPic(false);
    setDropzonePic(true);
  }

  function showImageModal(url, imageName, pic) {
    return (
      <Modal
        show={pic === "webcam" ? webcamPic : dropzonePic}
        onHide={() => (pic === "webcam" ? setWebcamPic(false) : setDropzonePic(false))}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {imageName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body align="center">
          <img src={url} alt="receipt"/>
        </Modal.Body>
      </Modal>
    )
  }

  function uploadReceiptColumn (url, imageName) {
    if (imageName !== undefined) {
      if (imageName.startsWith("picture-taken-from-camera-")) {
        //console.log("webcam", url);
        return (
          <>
            <Link className="spending-link" color="secondary" onClick={() => handleShowWebcam()}>
              {imageName}
            </Link>
            {webcamPic && showImageModal(url, imageName, "webcam")}
          </>
        );
      }
      else if (imageName !== "") {
        return (
          <a href={url} target="_blank">{imageName}</a>
          /*<>
            <Link className="spending-link" color="secondary" onClick={() => handleShowDropzone()}>
              {imageName}
            </Link>
            {dropzonePic && showImageModal(url, imageName, "dropzone")}
          </>
        );
      }
    }
    else {
      return;
    }
  }*/

  const handleClick = (event) => {
    event.preventDefault();
    fetchSpending();
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
      console.log('Deleted spending');
      updateSpendingsResult();
      //window.location.reload();
    }
    catch (error) {
      console.log('Error on delete spending', error);
    }
  }

  const handleFilter = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
    console.log(filter);
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
                helperText="by Spendings Name (case-sensitive) and Category"
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
                  {stableSort(spendings, getComparator(order, orderBy))
                    .map((spending) => {
                      return (
                        <TableRow hover key={spending.id}>
                          <TableCell align="center">{formatDate(spending.month, spending.day, spending.year)}</TableCell>
                          <TableCell align="center">{spending.name}</TableCell>
                          <TableCell className="d-none d-md-table-cell" align="center">{spending.payment}</TableCell>
                          <TableCell align="center">${spending.value}</TableCell>
                          <TableCell className="d-none d-md-table-cell" align="center">{spending.category}</TableCell>
                          {/*<TableCell className="d-none d-md-table-cell" align="center">{uploadReceiptColumn(spending.url, spending.imageName)}</TableCell>*/}
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
                                  //imageName: spending.imageName
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
            update={() => updateSpendingsResult()}
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