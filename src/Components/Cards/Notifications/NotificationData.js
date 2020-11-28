import { API, graphqlOperation } from 'aws-amplify';
import { listSavings, listSpendings } from '../../../graphql/queries';
import { startOfWeek, lastDayOfWeek } from 'date-fns';

const today = new Date();

let monthFilter = {
  year: {
    eq: today.getFullYear()
  },
  month: {
    eq: today.getMonth() + 1
  }
}

export async function getMonthSavingsTotal() {
  try {
    let monthTotal = 0;

    const monthlySavings = await API.graphql(graphqlOperation(listSavings, {filter: monthFilter}));
    const monthlySavingsList = monthlySavings.data.listSavings.items;
    for (var i = 0; i < monthlySavingsList.length; i++) {
      monthTotal = monthTotal + monthlySavingsList[i].value;
    }
    return monthTotal;
  } catch (error) {
    return "There was an error.";
  }
}

export async function getMonthSpendingsTotal() {
  try {
    let monthTotal = 0;

    const monthlySpendings = await API.graphql(graphqlOperation(listSpendings, {filter: monthFilter}));
    const monthlySpendingsList = monthlySpendings.data.listSpendings.items;
    for (var i = 0; i < monthlySpendingsList.length; i++) {
      monthTotal = monthTotal + monthlySpendingsList[i].value;
    }
    return monthTotal;
  } catch (error) {
    return "There was an error.";
  }
}

export function getMonthYear() {
  const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  return monthNames[today.getMonth()] + " " + today.getFullYear();
}

export function weekPeriod() {
  var start = startOfWeek(today).toLocaleDateString();
  var end = lastDayOfWeek(today).toLocaleDateString();
  return [start, end];
}

function getDaysOfWeek() {
  var start = startOfWeek(today).getDate();
  var end = lastDayOfWeek(today).getDate();

  start = formatDate(start);
  end = formatDate(end);

  let weekFilter = {
    year: {
      eq: today.getFullYear()
    },
    month: {
      eq: today.getMonth() + 1
    },
    day: {
      ge: start,
      le: end
    }
  }

  return weekFilter;
}

function formatDate(day) {
  if (day < 10) {
    day = "0" + day;
  }
  return day;
}

export async function getWeekSaving() {
  try {
    let weekSavingTotal = 0;

    const weeklySavings = await API.graphql(graphqlOperation(listSavings, {filter: getDaysOfWeek()}));
    const weeklySavingsList = weeklySavings.data.listSavings.items;

    for (var i = 0; i < weeklySavingsList.length; i++) {
      weekSavingTotal = weekSavingTotal + weeklySavingsList[i].value;
    }
    return weekSavingTotal;
  } catch (error) {
    return "There was an error.";
  }
}

export async function getWeekSpending() {
  try {
    let weekSpendingTotal = 0;

    const weeklySpendings = await API.graphql(graphqlOperation(listSpendings, {filter: getDaysOfWeek()}));
    const weeklySpendingsList = weeklySpendings.data.listSpendings.items;

    for (var i = 0; i < weeklySpendingsList.length; i++) {
      weekSpendingTotal = weekSpendingTotal + weeklySpendingsList[i].value;
    }
    return weekSpendingTotal;
  } catch (error) {
    return "There was an error.";
  }
}