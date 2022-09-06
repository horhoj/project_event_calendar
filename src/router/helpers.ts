import { generatePath } from 'react-router-dom';
import { routeList, Routes } from './routeList';

export const getRoutePath = (
  routeName: Routes,
  id: string | null = null,
): string => {
  const path = routeList[routeName].path;

  if (!id) {
    return path;
  }

  return generatePath(path, { id });
};
