import React from 'react';
import { Router } from '../router';
import styles from './App.module.scss';
import { Spinner } from './Spinner';

export const App: React.FC = () => {
  return (
    <>
      <Spinner />
      <div className={styles.wrap}>
        <Router />
      </div>
    </>
  );
};
