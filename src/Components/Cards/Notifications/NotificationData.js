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

function formatDate(day) {
  if (day < 10) {
    day = "0" + day;
  }
  return day;
}

function splitDate(date) {
  const dateArray = date.split("/");
  dateArray[1] = formatDate(dateArray[1]);
  return [dateArray[0], dateArray[1], dateArray[2]];
}

function getDaysOfWeek() {
  //var start = startOfWeek(today).getDate();
  //var end = lastDayOfWeek(today).getDate();

  //start = formatDate(start);
  //end = formatDate(end);

  const week = weekPeriod();
  const startWeek = week[0];
  const startArray = splitDate(startWeek);
  const endWeek = week[1];
  const endArray = splitDate(endWeek);

  var endOfMonth = startArray[1] > endArray[1];

  let weekFilter = {
    year: {
      eq: today.getFullYear()
    },
    month: {
      eq: today.getMonth() + 1
    },
    day: {
      ge: startArray[1],
      le: endArray[1]
    }
  };

  let endMonthFilter = {
    year: {
      eq: today.getFullYear()
    },
    month: {
      eq: startArray[0]
    },
    day: {
      ge: startArray[1]
    }
  };

  let begMonthFilter = {
    year: {
      eq: today.getFullYear()
    },
    month: {
      eq: endArray[0]
    },
    day: {
      le: endArray[1]
    }
  };

  if (endOfMonth) {
    return [endMonthFilter, begMonthFilter];
  }
  else {
    return [weekFilter];
  }
}

export async function getWeekSaving() {
  try {
    let weekSavingTotal = 0;
    const filter = getDaysOfWeek();

    if (filter.length === 2) {
      const weeklyEndOfMonth = await API.graphql(graphqlOperation(listSavings, {filter: filter[0]}));
      const weekEndSavingsList = weeklyEndOfMonth.data.listSavings.items;
      const weeklyBegOfMonth = await API.graphql(graphqlOperation(listSavings, {filter: filter[1]}));
      const weekBegSavingsList = weeklyBegOfMonth.data.listSavings.items;

      const combinedWeekSavingsList = weekEndSavingsList.concat(weekBegSavingsList);
      for (let i = 0; i < combinedWeekSavingsList.length; i++) {
        weekSavingTotal = weekSavingTotal + combinedWeekSavingsList[i].value;
      }
    }
    else if (filter.length === 1) {
      const weeklySavings = await API.graphql(graphqlOperation(listSavings, {filter: filter[0]}));
      const weeklySavingsList = weeklySavings.data.listSavings.items;
      for (let i = 0; i < weeklySavingsList.length; i++) {
        weekSavingTotal = weekSavingTotal + weeklySavingsList[i].value;
      }
    }
    
    return weekSavingTotal;
  } catch (error) {
    return "There was an error.";
  }
}

export async function getWeekSpending() {
  try {
    let weekSpendingTotal = 0;
    const filter = getDaysOfWeek();

    if (filter.length === 2) {
      const weeklyEndOfMonth = await API.graphql(graphqlOperation(listSpendings, {filter: filter[0]}));
      const weekEndSpendingsList = weeklyEndOfMonth.data.listSpendings.items;
      const weeklyBegOfMonth = await API.graphql(graphqlOperation(listSpendings, {filter: filter[1]}));
      const weekBegSpendingsList = weeklyBegOfMonth.data.listSpendings.items;

      const combinedWeekSpendingsList = weekEndSpendingsList.concat(weekBegSpendingsList);
      for (let i = 0; i < combinedWeekSpendingsList.length; i++) {
        weekSpendingTotal = weekSpendingTotal + combinedWeekSpendingsList[i].value;
      }
    }
    else if (filter.length === 1) {
      const weeklySpendings = await API.graphql(graphqlOperation(listSpendings, {filter: filter[0]}));
      const weeklySpendingsList = weeklySpendings.data.listSpendings.items;
      for (let i = 0; i < weeklySpendingsList.length; i++) {
        weekSpendingTotal = weekSpendingTotal + weeklySpendingsList[i].value;
      }
    }

    return weekSpendingTotal;
  } catch (error) {
    return "There was an error.";
  }
}