import { FC } from 'react';
import { EventCalendarMain } from '../EventCalendar/EventCalendarMain/EventCalendarMain';
import styles from './HomeMainForm.module.scss';

export const HomeMainForm: FC = () => {
  return (
    <div className={styles.wrap}>
      <EventCalendarMain />
    </div>
  );
};
