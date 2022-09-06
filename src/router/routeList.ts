import { FC } from 'react';
import { HomeMainForm } from '../features/HomeMainForm';
import { P404page } from '../pages/P404page';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = ['HomePage', 'Page404'] as const;

export type Routes = typeof routeNameList[number];

export const routeList: Record<Routes, RouteItem> = {
  HomePage: {
    path: '/',
    component: HomeMainForm,
  },

  Page404: {
    path: '*',
    component: P404page,
  },
};
