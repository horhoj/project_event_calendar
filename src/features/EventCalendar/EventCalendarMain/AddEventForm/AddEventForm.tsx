import { FC } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { eventCalendarSlice } from '../../eventCalendarSlice';
import { EventItemData } from '../../../../api/events/types';
import { EventForm } from '../EventForm';
import { EventEditData } from '../EventForm/types';
import { getDate, getTime } from '../../helpers';

const currentDateTime = new Date().getTime();

const NEW_EVENT_INITIAL_STATE: EventEditData = {
  title: '',
  description: '',
  date: getDate(currentDateTime),
  time: getTime(currentDateTime),
};

export const AddEventForm: FC = () => {
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(
      eventCalendarSlice.actions.setEventFormShowMode({
        eventFormShowMode: 'hide',
      }),
    );
  };

  const handleSubmit = (values: EventEditData) => {
    const unixDate = new Date(`${values.date}T${values.time}`).getTime();

    const eventItemData: EventItemData = {
      title: values.title,
      description: values.description,
      unixDate,
    };
    dispatch(eventCalendarSlice.thunks.addEventThunk({ eventItemData }));
  };

  return (
    <EventForm
      initialValues={NEW_EVENT_INITIAL_STATE}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};
