import React, { useState, useEffect }  from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { getMonthSpendingsTotal, getMonthYear } from './NotificationData';
import SpendingsSVG from '../../../Images/spendings.svg';
import './Notification.css';

function SpendingNotification () {

  const [spendings, setSpendings] = useState();

  useEffect(() => {
    spendingTotal()
  }, []);

  async function spendingTotal() {
    const result = await getMonthSpendingsTotal();
    setSpendings(result);
  }

  return (
    <Card variant="outlined" className="notification-card notification-spending">
      <CardContent>
        <Typography color="textSecondary" variant="caption">
          {getMonthYear()}
        </Typography>
        <p><b>Monthly Spendings</b></p>
        <Typography variant="body2">
          Total Spent:
        </Typography>
        <b className="notification-emphasis">${spendings}</b> / $50
        <div align="center">
          <br />
          <img src={SpendingsSVG} alt="spending img" className="notification-spending-picture"/>
        </div>
      </CardContent>
    </Card>
  );
}

export default SpendingNotification;