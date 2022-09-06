import { RootState } from '../../../store/types';

export const getSelectedDate = (state: RootState) =>
  state.eventCalendar.selectedDate;

export const getDatesOfSelectedInterval = (state: RootState) =>
  state.eventCalendar.datesOfSelectedInterval;

export const getEventFormShowMode = (state: RootState) =>
  state.eventCalendar.eventFormShowMode;

export const getIsLoading = (state: RootState) =>
  state.eventCalendar.addEventRequest.isLoading ||
  state.eventCalendar.fetchEventListRequest.isLoading ||
  state.eventCalendar.deleteEventRequest.isLoading ||
  state.eventCalendar.editEventRequest.isLoading ||
  state.eventCalendar.patchEventRequest.isLoading;

export const getFetchEventListRequest = (state: RootState) =>
  state.eventCalendar.fetchEventListRequest;

export const getEditEventRequest = (state: RootState) =>
  state.eventCalendar.editEventRequest;
