import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeList, routeNameList } from './routeList';
import { RedirectExecutor } from './RedirectExecutor';

export const Router: FC = () => {
  return (
    <>
      <Routes>
        {routeNameList.map((routeName) => {
          const route = routeList[routeName];
          return (
            <Route
              path={route.path}
              key={routeName}
              element={<route.component />}
            />
          );
        })}
      </Routes>
      <RedirectExecutor />
    </>
  );
};
