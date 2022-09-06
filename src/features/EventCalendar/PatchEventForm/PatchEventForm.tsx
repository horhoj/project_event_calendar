import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { eventCalendarSlice } from '../eventCalendarSlice';
import { EventEditData } from '../EventEditForm/types';
import { getDate, getTime } from '../helpers';
import { EventEditForm } from '../EventEditForm';
import { EventItemData } from '../../../api/events/types';

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
    <EventEditForm
      initialValues={initialValues}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};
