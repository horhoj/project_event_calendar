import { actions, reducer } from './slice';
import * as thunks from './thunks';
import * as selectors from './selectors';
import * as hooks from './hooks';

export const eventCalendarSlice = {
  actions,
  reducer,
  thunks,
  selectors,
  hooks,
};
