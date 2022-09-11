import { FC, useRef, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addMonths } from 'date-fns';
import { eventCalendarSlice } from '../../eventCalendarSlice';
import { useAppSelector } from '../../../../store/hooks';
import { Button } from '../../../../UIKit/Button';
import { getDate } from '../../helpers';
import styles from './MonthSwitch.module.scss';

export const MonthSwitch: FC = () => {
  const dispatch = useDispatch();

  const inputDateRef = useRef<HTMLInputElement>(null);

  const selectedDate = useAppSelector(
    eventCalendarSlice.selectors.getSelectedDate,
  );

  const handlePrev = () => {
    const newSelectedDate = addMonths(selectedDate, -1).getTime();
    dispatch(
      eventCalendarSlice.thunks.fetchEventListThunk({
        selectedDate: newSelectedDate,
      }),
    );
  };

  const handleNext = () => {
    const newSelectedDate = addMonths(selectedDate, 1).getTime();
    dispatch(
      eventCalendarSlice.thunks.fetchEventListThunk({
        selectedDate: newSelectedDate,
      }),
    );
  };

  const handleShowCalendar = () => {
    if (inputDateRef.current) {
      inputDateRef.current.showPicker();
    }
  };

  const handleChangeCalendarDate = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      return;
    }
    const selectedDate = new Date(e.target.value).getTime();

    dispatch(eventCalendarSlice.thunks.fetchEventListThunk({ selectedDate }));
  };

  return (
    <div className={styles.wrap}>
      <Button onClick={handlePrev}>{`<`}</Button>
      <div className={styles.monthCaption}>
        {new Date(selectedDate).toLocaleString('default', {
          month: 'long',
        })}{' '}
        {new Date(selectedDate).getFullYear()}
      </div>
      <Button onClick={handleNext}>{`>`}</Button>
      <div className={styles.calendar}>
        <Button onClick={handleShowCalendar}>calendar</Button>
        <input
          type="date"
          tabIndex={-1}
          ref={inputDateRef}
          className={styles.calendarInput}
          onChange={handleChangeCalendarDate}
          value={getDate(selectedDate)}
        />
      </div>
    </div>
  );
};
