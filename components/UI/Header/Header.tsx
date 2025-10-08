import React from 'react';
import classes from './Header.module.css';

export default function Header() {
  const styles = ['flex-center', 'flex-column', classes.Header].join(' ');
  return (
    <h1 id='header' className={styles}>
      PILOT LOGBOOK
    </h1>
  );
}
