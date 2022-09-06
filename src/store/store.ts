import { configureStore } from '@reduxjs/toolkit';
import { eventCalendarSlice } from '../features/EventCalendar/eventCalendarSlice';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    eventCalendar: eventCalendarSlice.reducer,
  },
});
