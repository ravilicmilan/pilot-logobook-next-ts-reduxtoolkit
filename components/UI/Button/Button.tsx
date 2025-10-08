import React from 'react';
import classes from './Button.module.css';
import { ButtonType } from '@/types/components';

export default function Button(props: ButtonType) {
  const handleClick = (e: React.MouseEvent) => {
    if (!props.disabled) {
      props.onClick(e);
    }
  };

  const styles = ['flex-center', 'flex-column', classes.Button];

  if (props.type) {
    styles.push(classes[props.type]);
  } else {
    styles.push(classes.Primary);
  }

  if (props.buttonSmall) {
    styles.push(classes.Small);
  }

  if (props.disabled) {
    styles.push(classes.Disabled);
  }

  return (
    <div
      onClick={handleClick}
      style={props.styles}
      className={styles.join(' ')}
    >
      {props.buttonText}
    </div>
  );
}
