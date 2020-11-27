import React, { useState, useEffect }  from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { getMonthYear, getWeekSaving, getWeekSpending, weekPeriod } from './NotificationData';
import { splitDate } from '../../Tables/TableFunctions';
import WeeklySVG from '../../../Images/weekly.svg';
import './Notification.css';

function WeeklyNotification() {

  const [weeklySavings, setWeeklySavings] = useState();
  const [weeklySpendings, setWeeklySpendings] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    let isSubscribed = true;

    const days = weekPeriod();
    const start = splitDate(days[0]);
    const end = splitDate(days[1]);

    getWeekSaving().then(result => {
      if (isSubscribed) {
        setWeeklySavings(result);
      }
    })

    getWeekSpending().then(result => {
      if (isSubscribed) {
        setWeeklySpendings(result);
      }
    })

    if (isSubscribed) {
      setStartDate(start[0] + "/" + start[1]);
      setEndDate(end[0] + "/" + end[1]);
    }

    return () => isSubscribed = false;
  }, []);

  return (
    <Card variant="outlined" className="notification-card notification-weekly">
      <CardContent>
        <Typography color="textSecondary" variant="caption">
          {getMonthYear()}
        </Typography>
        <p>
          <b>Weekly Summary ({startDate} - {endDate})</b>
        </p>
        <Typography variant="body2">
          Total Spent:
        </Typography>
        <b className="notification-emphasis">${weeklySpendings}</b>
        <br />
        <br />
        <Typography variant="body2">
          Total Saved:
        </Typography>
        <b className="notification-emphasis">${weeklySavings}</b>
        <div align="right">
          <img src={WeeklySVG} alt="weekly img" className="notification-weekly-picture"/>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeeklyNotification;