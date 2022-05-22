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

// format a timestamp
module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  // create month objects
  const months = {
    0: monthLength === 'short' ? 'Jan' : 'January',
    1: monthLength === 'short' ? 'Feb' : 'February',
    2: monthLength === 'short' ? 'Mar' : 'March',
    3: monthLength === 'short' ? 'Apr' : 'April',
    4: monthLength === 'short' ? 'May' : 'May',
    5: monthLength === 'short' ? 'Jun' : 'June',
    6: monthLength === 'short' ? 'Jul' : 'July',
    7: monthLength === 'short' ? 'Aug' : 'August',
    8: monthLength === 'short' ? 'Sep' : 'September',
    9: monthLength === 'short' ? 'Oct' : 'October',
    10: monthLength === 'short' ? 'Nov' : 'November',
    11: monthLength === 'short' ? 'Dec' : 'December'
  };

  const dateObject = new Date(timestamp);
  const currentMonth = months[dateObject.getMonth()];
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

  const minutes = dateObject.getMinutes();

  // set our timeOfDay to am or pm
  const timeOfDay = dateObject.getHours() >= 12 ? 'pm' : 'am';
  const timeStampResult = `${currentMonth} ${dateMonth}, ${year} at ${hour}:${minutes} ${timeOfDay}`;

  return timeStampResult;
};
