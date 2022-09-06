import { formatISO } from 'date-fns';

export const getDate = (unixDateTime: number) =>
  formatISO(unixDateTime, { representation: 'date' });

export const getTime = (unixDateTime: number) =>
  formatISO(unixDateTime, {
    representation: 'time',
  }).slice(0, 5);
