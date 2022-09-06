import { FC } from 'react';
import { P404page } from '../pages/P404page';
import { EventCalendarPage } from '../pages/EventCalendarPage';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = ['EventCalendarPage', 'Page404'] as const;

export type Routes = typeof routeNameList[number];

export const routeList: Record<Routes, RouteItem> = {
  EventCalendarPage: {
    path: '/',
    component: EventCalendarPage,
  },

  Page404: {
    path: '*',
    component: P404page,
  },
};
