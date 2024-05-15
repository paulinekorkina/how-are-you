import dayjs from 'dayjs';
import 'dayjs/locale/ru';
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

  return dayjs(date).locale('ru').format('D MMM');
}

function humanizeFullDate(date) {
  return `${humanizeShortDate(date)} ${dayjs(date).format('HH:mm')}`;
}

function capitalizeFirstLetter(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

function sortByDate(conditionA, conditionB) {
  return dayjs(conditionB.date).diff(dayjs(conditionA.date));
}

export {
  humanizeShortDate, humanizeFullDate, capitalizeFirstLetter, sortByDate,
};
