// Convert the unixTimestamp to MMMM D, YYYY format
module.exports = function formattedDate (unixTimeStamp) {
    const moment = require('moment');
    return moment.unix(unixTimeStamp).format('MMMM D YYYY, HH:mm');
  }