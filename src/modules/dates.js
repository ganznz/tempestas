import moment from 'moment';

export const getLocalDate = (dt, timezoneOffset) => {
  const dateTime = moment.unix(dt).utc().add(timezoneOffset, 's');
  return dateTime;
}

export const getDateInfo = date => {
  const localDateTime = date.format('LT');
  const localDateDayOfMonth = date.format('Do');
  const localDateDayOfWeek = date.format('ddd');

  return {
    localDateTime,
    localDateDayOfMonth,
    localDateDayOfWeek
  }
}