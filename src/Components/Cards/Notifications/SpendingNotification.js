import React, { useState, useEffect }  from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { getMonthSpendingsTotal, getMonthYear } from './NotificationData';
import SpendingsSVG from '../../../Images/spendings.svg';
import './Notification.css';

function SpendingNotification(props) {

  const [spendings, setSpendings] = useState();

  useEffect(() => {
    let isSubscribed = true;
    
    getMonthSpendingsTotal().then(result => {
      if (isSubscribed) {
        setSpendings(result.toFixed(2));
      }
    })

    return () => isSubscribed = false;
  }, []);

  const color = spendings > props.spending ? "#ff0000" : "rgb(1, 114, 71)";

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
        <b style={{color: color}}>${spendings}</b> / ${props.spending}
        <div align="center">
          <img src={SpendingsSVG} alt="spending img" className="notification-spending-picture"/>
        </div>
      </CardContent>
    </Card>
  );
}

export default SpendingNotification;