import { createAsyncThunk } from '@reduxjs/toolkit';
import { endOfDay, startOfDay } from 'date-fns';
import { EventItemData } from '../../../api/events/types';
import { api } from '../../../api';
import { RootState } from '../../../store/types';
import { SLICE_NAME } from './types';
import { actions } from './slice';
import { getDatesOfSelectedIntervalHelper } from './helpers';

interface FetchEventListPayload {
  selectedDate: number;
}

export const fetchEventListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchEventList`,
  async ({ selectedDate }: FetchEventListPayload, { dispatch }) => {
    const datesOfSelectedInterval =
      getDatesOfSelectedIntervalHelper(selectedDate);

    const startDate = datesOfSelectedInterval[0];
    const endDate = datesOfSelectedInterval[datesOfSelectedInterval.length - 1];
    if (startDate && endDate) {
      const startTime = startOfDay(startDate).getTime();
      const endTime = endOfDay(endDate).getTime();
      const eventList = await api.events.fetchEventList(startTime, endTime);
      dispatch(actions.setSelectedDate({ selectedDate }));
      dispatch(actions.setDatesOfSelectedInterval({ datesOfSelectedInterval }));

      return eventList;
    }
  },
);

interface AddEventThunkPayload {
  eventItemData: EventItemData;
}

export const addEventThunk = createAsyncThunk(
  `${SLICE_NAME}/addEventThunk`,
  async ({ eventItemData }: AddEventThunkPayload, { dispatch, getState }) => {
    const { selectedDate } = (getState() as RootState).eventCalendar;
    await api.events.addEvent(eventItemData);
    dispatch(actions.setEventFormShowMode({ eventFormShowMode: 'hide' }));
    dispatch(fetchEventListThunk({ selectedDate }));
  },
);

interface DeleteEventThunkPayload {
  id: string;
}

export const deleteEventThunk = createAsyncThunk(
  `${SLICE_NAME}`,
  async ({ id }: DeleteEventThunkPayload, { dispatch, getState }) => {
    const { selectedDate } = (getState() as RootState).eventCalendar;
    await api.events.deleteEvent(id);
    dispatch(fetchEventListThunk({ selectedDate }));
  },
);

interface EditEventThunkPayload {
  id: string;
}

export const editEventThunk = createAsyncThunk(
  `${SLICE_NAME}/editEventThunk`,
  async ({ id }: EditEventThunkPayload, { dispatch }) => {
    const eventItem = await api.events.fetchEventItem(id);
    dispatch(actions.setEventFormShowMode({ eventFormShowMode: 'edit' }));
    return eventItem;
  },
);

interface PatchEventThunkPayload {
  id: string;
  eventItemData: EventItemData;
}

export const patchEventThunk = createAsyncThunk(
  `${SLICE_NAME}/patchEventThunk`,
  async (
    { id, eventItemData }: PatchEventThunkPayload,
    { dispatch, getState },
  ) => {
    const { selectedDate } = (getState() as RootState).eventCalendar;
    await api.events.patchEventItem(id, eventItemData);
    dispatch(fetchEventListThunk({ selectedDate }));
    dispatch(actions.setEventFormShowMode({ eventFormShowMode: 'hide' }));
  },
);
