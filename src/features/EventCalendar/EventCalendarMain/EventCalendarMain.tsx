import { FC } from 'react';
import { ModalWindow } from '../../../UIKit/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { eventCalendarSlice } from '../eventCalendarSlice';
import { Button } from '../../../UIKit/Button';
import { PatchEventForm } from './PatchEventForm';
import { AddEventForm } from './AddEventForm';
import styles from './EventCalendarMain.module.scss';
import { MonthSwitch } from './MonthSwitch';
import { MonthGrid } from './MonthGrid';

export const EventCalendarMain: FC = () => {
  eventCalendarSlice.hooks.useEventCalendarMain();

  const eventFormShowMode = useAppSelector(
    eventCalendarSlice.selectors.getEventFormShowMode,
  );

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(
      eventCalendarSlice.actions.setEventFormShowMode({
        eventFormShowMode: 'hide',
      }),
    );
  };

  const handleAddEvent = () => {
    dispatch(
      eventCalendarSlice.actions.setEventFormShowMode({
        eventFormShowMode: 'new',
      }),
    );
  };

  return (
    <>
      <ModalWindow
        isShowModal={
          eventFormShowMode === 'new' || eventFormShowMode === 'edit'
        }
        handleModalClose={handleCloseModal}
      >
        {eventFormShowMode !== 'edit' && <AddEventForm />}
        {eventFormShowMode === 'edit' && <PatchEventForm />}
      </ModalWindow>
      <div className={styles.wrap}>
        <div className={styles.monthSwitchWrap}>
          <Button onClick={handleAddEvent}>Add</Button>
          <MonthSwitch />
        </div>
        <div>
          <MonthGrid />
        </div>
      </div>
    </>
  );
};
