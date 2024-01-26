import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.locale('ru');

function humanizeShortDate(date) {
  if (dayjs(date).isToday()) {
    return 'Сегодня';
  }

  if (dayjs(date).isYesterday()) {
    return 'Вчера';
  }

  return dayjs(date).format('D MMM');
}

function humanizeFullDate(date) {
  return `${humanizeShortDate(date)} ${dayjs(date).format('HH:mm')}`;
}

function capitalizeFirstLetter(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

export { humanizeShortDate, humanizeFullDate, capitalizeFirstLetter };
