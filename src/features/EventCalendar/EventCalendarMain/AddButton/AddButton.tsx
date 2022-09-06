import { FC } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { eventCalendarSlice } from '../../eventCalendarSlice';
import styles from './AddButton.module.scss';

export const AddButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleBtnClk = () => {
    dispatch(
      eventCalendarSlice.actions.setEventFormShowMode({
        eventFormShowMode: 'new',
      }),
    );
  };

  return (
    <div className={styles.wrap}>
      <button className={styles.button} onClick={handleBtnClk}>
        Add
      </button>
    </div>
  );
};
