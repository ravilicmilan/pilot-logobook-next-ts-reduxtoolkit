'use client';
import { useRef, useState } from 'react';
import classes from './Form.module.css';
import { tableColumnKeys } from '@/lib/config';
import Input from '../UI/Input/Input';
import TypeOfFlightSelect from '../UI/Select/TypeOfFlightSelect';
import Button from '../UI/Button/Button';
import { timeDiff } from '@/utils/helpers';
import { LogbookKey } from '@/types/database';
import { FormType } from '@/types/components';

export default function Form(props: FormType) {
  const { currentLogbook, closeForm, saveLogbook } = props;
  const [logbookData, setLogbookData] = useState(currentLogbook);
  const formRef = useRef<HTMLFormElement>(null);

  const handleDestiantionDepartureTimeBlur = () => {
    // console.log('BLUR!');
    const departureTime = logbookData.departure_time;
    const destinationTime = logbookData.destination_time;
    if (departureTime !== null && destinationTime !== null) {
      const totalTime = timeDiff(departureTime, destinationTime);
      setLogbookData({
        ...logbookData,
        total_flight_time: !totalTime ? '' : totalTime,
      });
    }
  };

  const onValueChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const key = e.target.name;
    const value = e.target.value;

    setLogbookData({ ...logbookData, [key]: value });
  };

  const saveRecord = () => {
    saveLogbook(logbookData);
  };

  const renderRow = (key: string, value: string) => {
    if (key === 'type_of_flight') {
      return (
        <TypeOfFlightSelect
          name={key}
          hasDefaultDisabled
          labelText={value}
          value={logbookData[key] === null ? '' : logbookData[key]}
          onChange={onValueChange}
        />
      );
    } else if (key === 'route') {
      return (
        <>
          <label>{value}</label>
          <textarea
            name={key}
            value={logbookData[key] === null ? '' : logbookData[key]}
            onChange={onValueChange}
          ></textarea>
        </>
      );
    } else {
      return (
        <Input
          name={key}
          labelText={value}
          value={
            logbookData[key as LogbookKey] === null
              ? ''
              : String(logbookData[key as LogbookKey])
          }
          onChange={onValueChange}
          onBlur={
            key === 'destination_time' || key === 'departure_time'
              ? handleDestiantionDepartureTimeBlur
              : () => {}
          }
        />
      );
    }
  };
  // console.log('FORM RENDER:::::', props);
  return (
    <form
      ref={formRef}
      className={['flex-column', 'flex-center', classes.Form].join(' ')}
    >
      <div
        className={['flex-column', 'flex-center', classes.FromHeader].join(' ')}
      >
        LOGBOOK ENTRY
      </div>
      <div className={classes.FormWrapper}>
        {tableColumnKeys.map((col, idx) => {
          const arr = Object.entries(col);
          const [key, value] = arr[0];
          return (
            <div
              key={idx}
              className={
                idx === tableColumnKeys.length - 1
                  ? [classes.FormRow, classes.Last].join(' ')
                  : classes.FormRow
              }
            >
              {renderRow(key, value)}
            </div>
          );
        })}
      </div>

      <div className={classes.FormButtonsWrapper}>
        <Button buttonText='SAVE' onClick={saveRecord} type='Success' />
        <Button buttonText='CLOSE' onClick={closeForm} type='Close' />
      </div>
    </form>
  );
}
