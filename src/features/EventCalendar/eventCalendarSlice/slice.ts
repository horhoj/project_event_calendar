import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestSliceStateProperty } from '../../../store/types';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../../../store/helpers';
import { EventItem, EventList } from '../../../api/events/types';
import { EventFormShowMode, SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  selectedDate: number;
  datesOfSelectedInterval: number[];
  eventFormShowMode: EventFormShowMode;
  fetchEventListRequest: RequestSliceStateProperty<EventList>;
  addEventRequest: RequestSliceStateProperty<unknown>;
  deleteEventRequest: RequestSliceStateProperty<unknown>;
  editEventRequest: RequestSliceStateProperty<EventItem>;
  patchEventRequest: RequestSliceStateProperty<unknown>;
}

const initialState: InitialState = {
  selectedDate: 0,
  datesOfSelectedInterval: [],
  eventFormShowMode: 'hide',
  fetchEventListRequest: makeRequestSliceStateProperty<EventList>(),
  addEventRequest: makeRequestSliceStateProperty<unknown>(),
  deleteEventRequest: makeRequestSliceStateProperty<unknown>(),
  editEventRequest: makeRequestSliceStateProperty<EventItem>(),
  patchEventRequest: makeRequestSliceStateProperty<unknown>(),
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setEventFormShowMode: (
      state,
      action: PayloadAction<{ eventFormShowMode: EventFormShowMode }>,
    ) => {
      const { eventFormShowMode } = action.payload;
      state.eventFormShowMode = eventFormShowMode;
    },

    setSelectedDate: (
      state,
      action: PayloadAction<{ selectedDate: number }>,
    ) => {
      const { selectedDate } = action.payload;
      state.selectedDate = selectedDate;
    },

    setDatesOfSelectedInterval: (
      state,
      action: PayloadAction<{ datesOfSelectedInterval: number[] }>,
    ) => {
      const { datesOfSelectedInterval } = action.payload;
      state.datesOfSelectedInterval = datesOfSelectedInterval;
    },
  },
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.addEventThunk,
      'addEventRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchEventListThunk,
      'fetchEventListRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.deleteEventThunk,
      'deleteEventRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.editEventThunk,
      'editEventRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.patchEventThunk,
      'patchEventRequest',
    );
  },
});
