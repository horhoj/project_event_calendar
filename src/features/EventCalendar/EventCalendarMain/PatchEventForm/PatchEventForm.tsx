import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { eventCalendarSlice } from '../../eventCalendarSlice';
import { EventEditData } from '../EventForm/types';
import { getDate, getTime } from '../../helpers';
import { EventForm } from '../EventForm';
import { EventItemData } from '../../../../api/events/types';

export const PatchEventForm: FC = () => {
  const editEventRequest = useAppSelector(
    eventCalendarSlice.selectors.getEditEventRequest,
  );

  const dispatch = useAppDispatch();

  const { data } = editEventRequest;

  if (!data) {
    return null;
  }

  const initialValues: EventEditData = {
    title: data.title,
    description: data.description,
    date: getDate(data.unixDate),
    time: getTime(data.unixDate),
  };

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
    dispatch(
      eventCalendarSlice.thunks.patchEventThunk({ eventItemData, id: data.id }),
    );
  };

  return (
    <EventForm
      initialValues={initialValues}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};
