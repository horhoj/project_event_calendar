import { FC } from 'react';
import { ModalWindow } from '../../../UIKit/ModalWindow';
import { AddEventForm } from '../AddEventForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { eventCalendarSlice } from '../eventCalendarSlice';
import { PatchEventForm } from '../PatchEventForm';
import styles from './EventCalendarMain.module.scss';
import { MonthSwitch } from './MonthSwitch';
import { MonthGrid } from './MonthGrid';
import { AddButton } from './AddButton';

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

  return (
    <>
      <ModalWindow
        isShowModal={
          eventFormShowMode === 'new' || eventFormShowMode === 'edit'
        }
        handleModalClose={handleCloseModal}
      >
        {eventFormShowMode === 'new' && <AddEventForm />}
        {eventFormShowMode === 'edit' && <PatchEventForm />}
      </ModalWindow>
      <div className={styles.wrap}>
        <div className={styles.monthSwitchWrap}>
          <AddButton />
          <MonthSwitch />
        </div>
        <div>
          <MonthGrid />
        </div>
      </div>
    </>
  );
};
