const formatDate = (month, day, year) => {
  return month + "/" + day + "/" + year;
}

// Table Sort

function descendingComparator(a, b, orderBy) {
  if (orderBy === "date") {
    let bdate = new Date(formatDate(b.month, b.day, b.year));
    //console.log(b.month);
    let adate = new Date(formatDate(a.month, a.day, a.year));
    if (bdate < adate) {
      return -1;
    }
    if (bdate > adate) {
      return 1;
    }
  }
  else if (orderBy === "name") {
    let bname = b[orderBy].toLowerCase();
    let aname = a[orderBy].toLowerCase();
    if (bname < aname) {
      return -1;
    }
    if (bname > aname) {
      return 1;
    }
  }
  else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// MoreInformation Modal

const splitDate = (date) => {
  let split = date.split("/");
  let month = split[0];
  let day = split[1];
  let year = split[2];
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return [month, day, year];
}

module.exports = {
  formatDate,
  stableSort,
  getComparator,
  splitDate
}