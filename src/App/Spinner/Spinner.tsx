import React, { FC } from 'react';
import { useAppSelector } from '../../store/hooks';

import { eventCalendarSlice } from '../../features/EventCalendar/eventCalendarSlice';
import styles from './Spinner.module.scss';

export const Spinner: FC = () => {
  const eventCalendarSliceIsLoading = useAppSelector(
    eventCalendarSlice.selectors.getIsLoading,
  );

  const isLoading = eventCalendarSliceIsLoading;

  return isLoading ? <div className={styles.Spinner} /> : null;
};
