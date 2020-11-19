import React, { useState } from 'react';
import { Button, Card, CardContent, InputAdornment, makeStyles} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';


import TableField from '../../InputFields/TableField';
import EvenResult from './EvenResult';
import CardTitle from '../CardTitle';
import { onKeyDown } from './SplitFunctions';
import SplitEvenSVG from '../../../Images/splitfriends.svg';
import './SplitCard.css';

const useStyles = makeStyles({
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
});



function EvenSplit() {

  const classes = useStyles();

  const [partySize, setPartySize] = useState();
  const [billTotal, setBillTotal] = useState();
  const [tax, setTax] = useState();
  const [tip, setTip] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  
  function submitForm (data) {
    setPartySize(data[0]);
    setBillTotal(data[1]);
    setTax(data[2]);
    setTip(data[3]);
    setShow(true);
    setSubmitted(true);
    setSubmitted(false);
  }

  return (
    <Row>
      <Col xs={12} md={4}>
        <div className="splitcard">
          <Card className="spliteven-form" variant="outlined">
            <CardContent>
              <CardTitle title="Split the Bill Evenly" />
              <Formik
                initialValues={{
                  partySize: "",
                  total: "",
                  tax: "",
                  tip: "",
                }}
                validate={values => {
                  const errors = {};
            
                  if (!values.partySize) {
                    errors.partySize = "Required";
                  }
                  if (!values.total) {
                    errors.total = "Required";
                  }
                  return errors;
                }}
                onSubmit={(data, { resetForm }) => {
                  console.log(data);
                  const array = [data.partySize, data.total, data.tax, data.tip];
                  submitForm(array);
                  resetForm();
                }}
              >
                {({ values }) => (
                  <Form onKeyDown={onKeyDown}>
                    <TableField
                      InputProps={{
                        inputProps: { min: 0 }
                      }}
                      label="Party Size"
                      name="partySize"
                      placeholder="Enter the number of people in your party"
                      type="number"
                    />
                    <TableField
                      InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                      label="Total Price"
                      name="total"
                      placeholder="Enter the total price to be split"
                      type="number"
                    />
                    <TableField
                      label="Tax Percentage"
                      name="tax"
                      placeholder="9.25"
                      required={false}
                      type="number"
                    />
                    <TableField
                      label="Tip Percentage"
                      name="tip"
                      placeholder="15"
                      required={false}
                      type="number"
                    />
                    <Button
                      className={classes.createbutton}
                      disableElevation
                      disabled={!values.partySize || !values.total}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Split
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </Col>
      <Col>
        {!show && (
          <img src={SplitEvenSVG} align="center" alt="spliteven" className="spliteven-intropicture d-none d-md-block" />
        )}
        <EvenResult 
          submitted={submitted}
          party={partySize}
          tax={tax}
          tip={tip}
          total={billTotal}
          show = {show}
        />
      </Col>
    </Row>
  );
}

export default EvenSplit;