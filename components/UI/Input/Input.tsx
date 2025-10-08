import { InputType } from '@/types/components';
import classes from './Input.module.css';

export default function Input(props: InputType) {
  return (
    <>
      <label style={props.labelStyles}>{props.labelText}</label>
      <input
        style={props.styles}
        name={props.name}
        onBlur={props.onBlur}
        className={classes.Input}
        type={props.type || 'text'}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}
