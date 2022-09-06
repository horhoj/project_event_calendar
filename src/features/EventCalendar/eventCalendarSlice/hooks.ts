import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import * as thunks from './thunks';

export const useEventCalendarMain = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const selectedDate = new Date().getTime();

    dispatch(thunks.fetchEventListThunk({ selectedDate }));
  }, []);
};
