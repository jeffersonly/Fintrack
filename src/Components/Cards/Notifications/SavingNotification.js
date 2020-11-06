import React, { useState, useEffect }  from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { getMonthSavingsTotal, getMonthYear } from './NotificationData';
import SavingsSVG from '../../../Images/savings.svg';
import './Notification.css';

function SavingNotification () {

  const [savings, setSavings] = useState();

  useEffect(() => {
    savingTotal();
  }, []);

  async function savingTotal() {
    const result = await getMonthSavingsTotal();
    setSavings(result);
  }

  return (
    <Card variant="outlined" className="notification-card notification-saving">
      <CardContent>
        <Typography color="textSecondary" variant="caption">
          {getMonthYear()}
        </Typography>
        <p><b>Monthly Savings</b></p>
        <Typography variant="body2">
          Total Saved:
        </Typography>
        <b className="notification-emphasis">${savings}</b> / $50
        <div align="center">
          <br />
          <img src={SavingsSVG} alt="saving img" className="notification-saving-picture"/>
        </div>
      </CardContent>
    </Card>
  );
}

export default SavingNotification;