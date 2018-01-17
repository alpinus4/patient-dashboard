function __parseDate(givenDate, withMinutesHours) {
  //set default ARGs
  withMinutesHours = (typeof withMinutesHours === undefined) ? false : withMinutesHours;

  var date = new Date(givenDate);

  //part of code from https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date with added hours and minutes
  var myDateString;
  var myDateStringWithMinutesHours;
  date.setDate(date.getDate() + 0);

  myDateStringWithMinutesHours = ('0' + date.getDate()).slice(-2) + '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
    date.getFullYear() + '  ' +
    ('0' + (date.getHours() - 1)).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2);

  myDateStrings = ('0' + date.getDate()).slice(-2) + '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
    date.getFullYear();

  if (withMinutesHours) {
    return myDateStringWithMinutesHours;
  } else {
    return myDateString;
  }

}

//part of code from https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function __calculateAge(givenBirthdate) {
  birthdate = new Date(givenBirthdate);
  var ageDifMs = Date.now() - birthdate.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

//part of code from https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function __capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function __ironAjaxError(event){
  console.log(event);
  console.log(event.detail);
  console.log(event.detail.error);
  console.log(event.detail.error.message);
  console.log(event.detail.request);
  console.log(event.detail.response);
  console.log(event.detail.request.response);
}
