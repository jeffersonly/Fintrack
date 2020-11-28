import React, { useState } from 'react';
import { Button, Card, CardContent, IconButton, InputAdornment, makeStyles } from '@material-ui/core';
import { Formik, Form, FieldArray } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import { Row, Col } from 'react-bootstrap';
import { generate } from 'shortid';
import * as yup from 'yup';
import TableField from '../../InputFields/TableField';
import ItemTableCard from './ItemTableCard';
import ItemResult from './ItemResult';
import CardTitle from '../CardTitle';
import { onKeyDown } from './SplitFunctions';
import SplitItemSVG from '../../../Images/friends.svg';
import './SplitCard.css';

const useStyles = makeStyles((theme) => ({
  button: {
    '&:focus': {
      outline: "none"
    }
  },
  createbutton: {
    backgroundColor: "#ace1af",
    fontSize: "16px",
    width: "100%",
    '&:focus': {
      outline: "none",
    },
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  }
}));

const validationSchema = yup.object().shape({
  items: yup.array()
    .of(
      yup.object().shape({
        itemName: yup.string().required('Required'),
        price: yup.number().required('Required')
      })
    )
    .min(1, "At least 1 item is required."),
  name: yup.string().required('Required')
});

function ItemSplit() {

  const classes = useStyles();

  const [tableRows, setTableRows] = useState([]);
  const [tax, setTax] = useState();
  const [tip, setTip] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [result, setResult] = useState(false);

  //dataItems = array of objects
  function submitTableForm(dataName, dataItems) {
    for (let i = 0; i < dataItems.length; i++) {
      setTableRows(currentRows => [
        {
          id: generate(),
          name: dataName,
          item: dataItems[i].itemName,
          value: dataItems[i].price
        },
        ...currentRows
      ]);
    }
    setSubmitted(true);
  }

  function createData(dataName, dataItems) {
    const exists = data.some(function(obj) {
      return obj.name === dataName; 
    })
    if (exists) {
      const arr = data.find(item => item.name === dataName);
      for (var i = 0; i < dataItems.length; i++) {
        arr['items'].push({
          itemName: dataItems[i].itemName,
          price: dataItems[i].price
        });
      }
    }
    else {
      setData(currentRows => [
        {
          name: dataName,    
          items: dataItems
        },
        ...currentRows
      ]);
    }
  }

  function handleItemize(partyTax, partyTip) {
    setTax(partyTax);
    setTip(partyTip);
    setResult(true);
  }

  function clearTable() {
    setTableRows([]);
    setData([]);
    setSubmitted(false);
    setResult(false);
    setTip();
    setTax();
  }

  return (
    <Row>
      <Col xs={12} md={4}>
        <div className="splitcard">
          <Card className="splititem-form" variant="outlined">
            <CardContent>
              <CardTitle title="Split the Bill by Item" />
              <Formik
                initialValues={{
                  name: "",
                  items: [{ itemName: "", price: "" }]
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { resetForm}) => {
                  submitTableForm(data.name, data.items);
                  createData(data.name, data.items);
                  resetForm();
                }}
              >
                {({ values, errors }) => (
                  <Form onKeyDown={onKeyDown}>
                    <TableField
                      label="Party Member Name"
                      name="name"
                      placeholder="Mark C."
                    />
                    <FieldArray name="items">
                      {({ push, remove }) => (
                        <div>
                          {values.items.map((i, index) => {
                            return (
                              <Row key={index}>
                                <Col md={12} lg={6}>
                                  <TableField
                                    label="Item Name"
                                    name={`items[${index}].itemName`}
                                    placeholder="BLT Burger"
                                  />
                                </Col>
                                <Col md={12} lg={4}>
                                  <TableField 
                                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                                    label="Price"
                                    name={`items.${index}.price`} 
                                    placeholder="7.23"
                                    type="number"
                                  />
                                </Col>
                                <Col lg={2} className="splititem-textfield d-none d-lg-inline">
                                  {/* Remove item */}
                                  <IconButton 
                                    aria-label="delete" 
                                    className={classes.button}
                                    color="secondary"
                                    onClick={() => remove(index)}
                                    style={{marginTop: "3px"}}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Col>
                                <Col md={12} className="splititem-textfield d-lg-none">
                                  {/* Remove item */}
                                  <Button 
                                    className={classes.button}
                                    color="secondary"
                                    onClick={() => remove(index)}
                                    style={{marginTop: "-15px", marginBottom: "5px"}}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            )
                          })}
                          <div align="right" className="splititem-addbutton">
                          {/* Add a new empty item at the end of the list */}
                            <Button
                              className={classes.button}
                              disableElevation
                              onClick={() => push({ itemName: '', price: '' })}
                              size="small"
                              variant="contained"
                            >
                              + Add Item
                            </Button>
                          </div>
                          {typeof errors.items === 'string' ? <div className="splititem-errortext">{errors.items}</div> : null}
                        </div>
                      )}
                    </FieldArray>
                    <Button
                      className={classes.createbutton}
                      disableElevation
                      disabled={!values.name || errors.items !== undefined}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Itemize
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </Col>
      <Col xs={12} md={4}>
        <ItemTableCard
          itemize={(partyTax, partyTip) => handleItemize(partyTax, partyTip)}
          rows={tableRows}
          submitted={submitted}
        />
      </Col>
      <Col xs={12} md={4}>
        {!result && (
          <img src={SplitItemSVG} align="center" alt="splititem" className="splititem-intropicture d-none d-md-block" />
        )}
        <ItemResult
          clearTable={clearTable}
          result={result}
          rows={data}
          tax={tax}
          tip={tip}
        />
      </Col>
    </Row>
  );
}

export default ItemSplit;