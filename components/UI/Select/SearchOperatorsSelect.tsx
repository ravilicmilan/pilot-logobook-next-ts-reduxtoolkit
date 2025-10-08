import { SelectType } from '@/types/components';
import classes from './Select.module.css';
import { searchOperators } from '@/lib/config';

export default function SearchOperatorsSelect(props: SelectType) {
  return (
    <select
      value={props.value}
      className={classes.Select}
      onChange={props.onChange}
      style={props.styles}
    >
      {searchOperators.map((o, idx) => (
        <option key={idx} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
