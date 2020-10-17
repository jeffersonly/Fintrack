import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import ReceiptSVG from '../../Images/receipt.svg';
import './Profile.css';

function Receipts() {

  return (
    <div className="profile">
      <h4 className="profile-title">Receipts</h4>
      <Row>
        <Col xs={7} md={7}>
          <Card variant="outlined" className="profile-card">
            <CardContent>
              <div>
                <b className="profile-subtitle">UPLOADED</b>
              </div>
            </CardContent>
          </Card>
        </Col>
        <Col xs={4} md={4}>
          <img src={ReceiptSVG} align="center" alt="profile img" className="profile-picture"/>
        </Col>
      </Row>
    </div>
  );
}

export default Receipts;