import React, { useState, useEffect }  from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { getMonthYear, getWeekSaving, getWeekSpending, weekPeriod } from './NotificationData';
import { splitDate } from '../../Tables/TableFunctions';
import WeeklySVG from '../../../Images/weekly.svg';
import './Notification.css';

function WeeklyNotification () {

  const [weeklySavings, setWeeklySavings] = useState();
  const [weeklySpendings, setWeeklySpendings] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    weeklySaving();
    weeklySpending();
    const days = weekPeriod();
    const start = splitDate(days[0]);
    const end = splitDate(days[1]);
    setStartDate(start[0] + "/" + start[1]);
    setEndDate(end[0] + "/" + end[1]);
  }, []);

  async function weeklySaving() {
    const result = await getWeekSaving();
    setWeeklySavings(result);
  }

  async function weeklySpending() {
    const result = await getWeekSpending();
    setWeeklySpendings(result);
  }

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
        <b className="notification-emphasis">${weeklySpendings}</b> / $50
        <br />
        <br />
        <Typography variant="body2">
          Total Saved:
        </Typography>
        <b className="notification-emphasis">${weeklySavings}</b> / $50
        <div align="right">
          <img src={WeeklySVG} alt="weekly img" className="notification-weekly-picture"/>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeeklyNotification;