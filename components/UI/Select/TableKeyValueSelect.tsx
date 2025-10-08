import { SelectType } from '@/types/components';
import classes from './Select.module.css';
import { tableColumnKeys } from '@/lib/config';

export default function TableKeyValueSelect(props: SelectType) {
  return (
    <select
      className={classes.Select}
      value={props.value}
      onChange={props.onChange}
      style={props.styles}
    >
      {tableColumnKeys.map((col, idx) => {
        const [key, value] = Object.entries(col)[0];
        return (
          <option key={idx} value={key}>
            {value}
          </option>
        );
      })}
    </select>
  );
}
