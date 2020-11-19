import React from 'react';
import { Button, Card, CardContent, Divider, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { calculateTaxTip, calculateTotal } from './SplitFunctions';
import './SplitCard.css';
import {API} from 'aws-amplify';
import { createSplitItem } from '../../../graphql/mutations';

async function submitSplitItem(data) {
  try {
    await API.graphql({
      query: createSplitItem,
      variables: {
        input: {
          month: data[0],
          day: data[1],
          year: data[2],
          total: data[3],
          tax: data[4],
          tip: data[5],
          names: data[6],
          split: data[7]
        }
      }
    })
  } catch (err) {
    console.log({ err });
  }
}

function ItemResult (props) {
  
  function getNamesTotal () {
    let names = [];
    let total = [];
    for (var i = 0; i < props.rows.length; i++) {
      names.push(props.rows[i].name);
      let value = 0;
      for (var j = 0; j < props.rows[i].items.length; j++) {
        value = value + props.rows[i].items[j].price;
      }
      total.push(value);
    }
    return {
      names: names,
      total: total
    };
  }

  const today = new Date();
  const names = getNamesTotal().names;
  const prices = getNamesTotal().total;
  const tax = props.tax ? props.tax : 0;
  const tip = props.tip ? props.tip : 0;
  let partyResult = [];

  function printCalculations () {
    let result = [];
    let last = false;
    for (var i = 0; i < names.length; i++) {
      let indivTax = calculateTaxTip(prices[i], tax);
      let indivTip = calculateTaxTip(prices[i], tip);
      let indivTotal = calculateTotal(prices[i], indivTax, indivTip);
      if (i === names.length - 1) {
        last = true;
      }
      let item = (
        <div key={i}>
          <Row>
            <Col xs={4}>
              <Typography variant="button">
                {names[i]}
              </Typography>
            </Col>
            <Col>
              <b>Current Total:</b> ${prices[i]}
              <p></p>
              <b>Tax Value:</b> 
              <p>${prices[i]} * {tax}% = ${indivTax}</p>
              <b>Tip Value:</b> 
              <p>${prices[i]} * {tip}% = ${indivTip}</p>
              <b>Final Total (including tax + tip):</b> 
              <p>${prices[i]} + ${indivTax} + ${indivTip} = ${indivTotal}</p>
            </Col>
          </Row>
          {!last && <Divider className="splititem-horizontaldivider"/>}
        </div>
      );
      let finalResult = (
        <div key={i}>
          <i>{names[i]}:</i><b className="spliteven-result-text"> ${indivTotal}</b>
        </div>
      );
      result.push(item);
      partyResult.push(finalResult);
    }
    return result;
  }

  function printResults () {
    return partyResult;
  }

  function saveResults () {
    let ppl = ""
    let byPerson = ""
    for (var i = 0; i < partyResult.length; i++) {
      ppl += partyResult[i].props.children[0].props.children[0]
      ppl += " "
      byPerson += partyResult[i].props.children[1].props.children[1]
      byPerson += " "
    }
    let array = [(today.getMonth()+1), today.getDate(), today.getFullYear(), prices.join(' '), tax, tip, ppl, byPerson];
    submitSplitItem(array)
  }

  return (
    <div>
      {props.result && (
        <Card className="splititem-result" variant="outlined">
          <CardContent>
            <div>
              <Typography className="spliteven-result-title" variant="h6">
                  RESULT
              </Typography>
              {printResults()}
              <div align="right" className="splititem-clearbutton">
                <Button
                  disableElevation
                  onClick={props.clearTable}
                  variant="contained"
                >
                  Clear
                </Button>
                <p></p>
                <Button
                  disableElevation
                  onClick={saveResults}
                  variant="contained"
                >
                  Save
                </Button>
              </div>              
              <Divider className="spliteven-horizontaldivider"/>
              <Typography className="spliteven-result-title" variant="subtitle1">
                <u>CALCULATION</u>
              </Typography>
              {printCalculations()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ItemResult;