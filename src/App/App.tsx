import React from 'react';
import { Router } from '../router';
import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <Router />
    </div>
  );
};
