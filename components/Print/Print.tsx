'use client';

import classes from './Print.module.css';
import Checkbox from '../UI/Checkbox/Checkbox';
import Button from '../UI/Button/Button';
import { PrintType } from '@/types/components';

export default function Print(props: PrintType) {
  const { fields, updateFields, executePrint, closePrintDialog } = props;

  const renderCheckboxes = () => {
    return fields.map((field) => (
      <Checkbox
        key={field.key}
        name={field.key}
        labelText={field.text}
        onChange={updateFields}
        checked={field.checked}
      />
    ));
  };

  return (
    <div className={['flex-column', 'flex-center', classes.Print].join(' ')}>
      <h2 className={classes.PrintHeader}>PRINT DIALOG</h2>
      <h4 className={classes.PrintSubHeader}>Choose fields to be printed</h4>
      <div className={['flex-column', classes.CheckboxWrapper].join(' ')}>
        {renderCheckboxes()}
      </div>
      <div
        className={[
          'flex-row',
          'flex-center',
          'flex-gap-20',
          classes.ButtonsWrapper,
        ].join(' ')}
      >
        <Button buttonText='PRINT' onClick={executePrint} type='Primary' />
        <Button buttonText='CLOSE' onClick={closePrintDialog} type='Close' />
      </div>
    </div>
  );
}
