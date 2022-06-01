const createDateSuffix = date => {
  let dateString = date.toString();
  // find the last character in the dateString
  const character = dateString.charAt(dateString.length - 1);

  if (character === '1' && dateString !== '11') {
    dateString = `${dateString}st`;
  } 
  else if (character === '2' && dateString !== '12') {
    dateString = `${dateString}nd`;
  } 
  else if (character === '3' && dateString !== '13') {
    dateString = `${dateString}rd`;
  } 
  else {
    dateString = `${dateString}th`;
  }
  return dateString;
};

module.exports = (
  timestamp,
  { month = 'short', dateSuffix = true } = {}
) => {
  // create month objects
  const monthObj = {
    0: month === 'short' ? 'Jan' : 'January',
    1: month === 'short' ? 'Feb' : 'February',
    2: month === 'short' ? 'Mar' : 'March',
    3: month === 'short' ? 'Apr' : 'April',
    4: month === 'short' ? 'May' : 'May',
    5: month === 'short' ? 'Jun' : 'June',
    6: month === 'short' ? 'Jul' : 'July',
    7: month === 'short' ? 'Aug' : 'August',
    8: month === 'short' ? 'Sep' : 'September',
    9: month === 'short' ? 'Oct' : 'October',
    10: month === 'short' ? 'Nov' : 'November',
    11: month === 'short' ? 'Dec' : 'December'
  };

  const dateObject = new Date(timestamp);
  const currentMonth = monthObj[dateObject.getMonth()];
  const dateMonth = dateSuffix
    ? createDateSuffix(dateObject.getDate())
    : dateObject.getDate();
  const year = dateObject.getFullYear();
  let hour =
    dateObject.getHours() > 12
      ? Math.floor(dateObject.getHours() / 2)
      : dateObject.getHours();
  // whena new day starts, change hour from 0 to 12am
  if (hour === 0) {
    hour = 12;
  }
  // set timeOfDay
  const minutes = dateObject.getMinutes();
  const timeOfDay = dateObject.getHours() >= 12 ? 'pm' : 'am';
  const timeOutput = `${currentMonth} ${dateMonth}, ${year} at ${hour}:${minutes} ${timeOfDay}`;

  return timeOutput;
};
