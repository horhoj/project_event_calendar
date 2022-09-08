import { FC } from 'react';
import classNames from 'classnames';
import { eventCalendarSlice } from '../../eventCalendarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import styles from './MonthGrid.module.scss';
import { MonthGridCard } from './MonthGridCard';

export const MonthGrid: FC = () => {
  const dispatch = useAppDispatch();

  const datesOfSelectedInterval = useAppSelector(
    eventCalendarSlice.selectors.getDatesOfSelectedInterval,
  );

  const selectedDate = useAppSelector(
    eventCalendarSlice.selectors.getSelectedDate,
  );

  const fetchEventListRequest = useAppSelector(
    eventCalendarSlice.selectors.getFetchEventListRequest,
  );

  const handleDeleteEventItem = (id: string) => {
    if (confirm('Delete?')) {
      dispatch(eventCalendarSlice.thunks.deleteEventThunk({ id }));
    }
  };

  const handleEditEventItem = (id: string) => {
    dispatch(eventCalendarSlice.thunks.editEventThunk({ id }));
  };

  return (
    <div className={classNames(styles.wrap, 'g-scroll-bar')}>
      <div className={styles.monthGrid}>
        {datesOfSelectedInterval.map((unixDate) => (
          <MonthGridCard
            key={unixDate}
            unixDate={unixDate}
            selectedDate={selectedDate}
            eventList={fetchEventListRequest.data}
            onDelete={handleDeleteEventItem}
            onEdit={handleEditEventItem}
          />
        ))}
      </div>
    </div>
  );
};
