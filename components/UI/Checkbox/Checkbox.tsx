import React from 'react';
import classes from './Checkbox.module.css';
import { CheckboxType } from '@/types/components';

export default function Checkbox(props: CheckboxType) {
  return (
    <label className={['flex-row', 'flex-start', classes.Checkbox].join(' ')}>
      <input
        type='checkbox'
        onChange={props.onChange}
        checked={props.checked}
        name={props.name}
      />
      <span className={classes.LabelText}>{props.labelText}</span>
    </label>
  );
}
