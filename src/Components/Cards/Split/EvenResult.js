import React from 'react';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import CalculationSVG from '../../../Images/calculator.svg';
import { calculateTaxTip, calculateTotal } from './SplitFunctions';
import './SplitCard.css';

function EvenResult (props) {

  function perPerson (total, people) {
    return Number((total / people).toFixed(2));
  }

  const tax = props.tax ? props.tax : 0;
  const tip = props.tip ? props.tip : 0;
  const payTax = calculateTaxTip(props.total, props.tax);
  const payTip = calculateTaxTip(props.total, props.tip);
  const finalTotal = calculateTotal(props.total, payTax, payTip);
  const byPerson = perPerson(finalTotal, props.party)

  return (
    <div>
      {props.submitted && (
        <Card className="spliteven-card" variant="outlined">
          <CardContent>
            <div>
              <Row>
                <Col xs={5} md={5}>
                  <Typography className="spliteven-result-title" variant="h6">
                    INFORMATION
                  </Typography>
                  <b>Party Size:</b> {props.party}
                  <br />
                  <b>Bill Total:</b> ${props.total.toFixed(2)}
                  <br />
                  <b>Tax:</b> {tax}%
                  <br />
                  <b>Tip:</b> {tip}%
                </Col>
                <Col xs={1} md={1} />
                <Col xs={1} md={1}>
                  <Divider className="spliteven-verticaldivider" orientation="vertical" />
                </Col>
                <Col xs={5} md={5} className="spliteven-result">
                  <Typography className="spliteven-result-title" variant="h6">
                    RESULT
                  </Typography>
                  <br />
                  <b className="spliteven-result-text">${byPerson}</b> / person
                </Col>
              </Row>
              <Divider className="spliteven-horizontaldivider"/>
              <Row>
                <Col xs={12} md={8}>
                  <Typography className="spliteven-result-title" variant="subtitle1">
                    <u>CALCULATION</u>
                  </Typography>
                  <b>Tax Value:</b> 
                  <p>${props.total} * {tax}% = ${payTax}</p>
                  <b>Tip Value:</b> 
                  <p>${props.total} * {tip}% = ${payTip}</p>
                  <b>Final Total (including tax + tip):</b> 
                  <p>${props.total} + ${payTax} + ${payTip} = ${finalTotal}</p>
                  <b>Per Person:</b> 
                  <br/>
                  ${finalTotal} / {props.party} = ${byPerson}
                </Col>
                <Col md={4}>
                  <img src={CalculationSVG} align="center" alt="calculator img" className="spliteven-picture"/>
                </Col>
              </Row>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default EvenResult;