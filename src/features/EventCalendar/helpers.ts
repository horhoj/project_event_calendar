import { formatISO } from 'date-fns';

export const getDate = (unixDateTime: number): string =>
  formatISO(unixDateTime, { representation: 'date' });

export const getTime = (unixDateTime: number): string =>
  formatISO(unixDateTime, {
    representation: 'time',
  }).slice(0, 5);
