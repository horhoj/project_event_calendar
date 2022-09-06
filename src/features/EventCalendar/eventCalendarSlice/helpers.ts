import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { START_OF_WEEK } from '../../../config/app';

export const getDatesOfSelectedIntervalHelper = (
  selectedDate: number,
): number[] => {
  //получаем дату начала и конца месяца
  const startDateOfSelectedMonth = startOfMonth(selectedDate).getTime();
  const endDateOfSelectedMonth = endOfMonth(selectedDate).getTime();

  //начало интервала это начало недели первого числа месяца
  const start = startOfWeek(startDateOfSelectedMonth, {
    weekStartsOn: START_OF_WEEK,
  }).getTime();

  const end = endOfWeek(endDateOfSelectedMonth, {
    weekStartsOn: START_OF_WEEK,
  }).getTime();

  return eachDayOfInterval({ start, end }).map((date) => date.getTime());
};
