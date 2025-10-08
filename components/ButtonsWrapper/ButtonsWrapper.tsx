'use client';
import classes from './ButtonsWrapper.module.css';
import Button from '../UI/Button/Button';
import { ButtonsWrapperType } from '@/types/components';

export default function ButtonsWrapper(props: ButtonsWrapperType) {
  return (
    <div
      id='button-wrapper'
      className={['flex-row', 'flex-center', classes.ButtonsWrapper].join(' ')}
    >
      <Button buttonText='NEW ENTRY' onClick={props.openForm} type='Primary' />
      <Button buttonText='REFRESH' onClick={props.refreshData} type='Primary' />
      <Button
        buttonText={props.searchButtonText}
        onClick={props.toggleSearch}
        type='Primary'
      />
      <Button buttonText='PRINT' onClick={props.printDialog} type='Primary' />
      <Button buttonText='LOGOUT' onClick={props.logoutUser} type='Close' />
    </div>
  );
}
