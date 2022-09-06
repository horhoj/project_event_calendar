import { FC, useRef, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addMonths } from 'date-fns';
import { eventCalendarSlice } from '../../eventCalendarSlice';
import { useAppSelector } from '../../../../store/hooks';
import styles from './MonthSwitch.module.scss';

export const MonthSwitch: FC = () => {
  const dispatch = useDispatch();

  const inputDateRef = useRef<HTMLInputElement>(null);

  const selectedDate = useAppSelector(
    eventCalendarSlice.selectors.getSelectedDate,
  );

  const handlePrev = () => {
    // dispatch(eventCalendarSlice.actions.subtractMonthFromSelectedDate());
    const newSelectedDate = addMonths(selectedDate, -1).getTime();
    dispatch(
      eventCalendarSlice.thunks.fetchEventListThunk({
        selectedDate: newSelectedDate,
      }),
    );
  };

  const handleNext = () => {
    // dispatch(eventCalendarSlice.actions.addMonthToSelectedDate());
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
      <button className={styles.navBtn} onClick={handlePrev}>{`<`}</button>
      <div className={styles.monthCaption}>
        {new Date(selectedDate).toLocaleString('default', {
          month: 'long',
        })}{' '}
        {new Date(selectedDate).getFullYear()}
      </div>
      <button className={styles.navBtn} onClick={handleNext}>{`>`}</button>
      <div className={styles.calendar}>
        <button onClick={handleShowCalendar} className={styles.calendarButton}>
          calendar
        </button>
        <input
          type="date"
          tabIndex={-1}
          ref={inputDateRef}
          className={styles.calendarInput}
          onChange={handleChangeCalendarDate}
        />
      </div>
    </div>
  );
};
