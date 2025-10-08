'use client';
import classes from './Search.module.css';
import Button from '../UI/Button/Button';
import SearchParams from './SearchParams/SearchParams';
import { findRecordsByQuery } from '@/utils/logbookHelpers';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { SearchPropsType, SearchType } from '@/types/components';
import {
  addSearchParams,
  updateSearchParams,
  removeSearchParams,
} from '@/lib/features/search/searchSlice';

export default function Search(props: SearchPropsType) {
  const state = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const onLabelChange = (idx: number, value: string) => {
    updateState(idx, 'label', value);
  };

  const onOperatorChange = (idx: number, value: string) => {
    updateState(idx, 'operator', value);
  };

  const onValueChange = (idx: number, value: string) => {
    updateState(idx, 'value', value);
  };

  const updateState = (idx: number, key: keyof SearchType, value: string) => {
    // dispatch({ type: 'UPDATE_SEARCH_PARAMS', params: { idx, key, value } });
    dispatch(updateSearchParams({ idx, key, value }));
  };

  const addNewRow = () => {
    // dispatch({ type: 'ADD_SEARCH_PARAMS' });
    dispatch(addSearchParams());
  };

  const removeParam = (idx: number) => {
    // dispatch({ type: 'REMOVE_SEARCH_PARAMS', idx });
    dispatch(removeSearchParams(idx));
  };

  const findRecordsWithParams = () => {
    console.log('EXECUTE SEARCH!', state);
    const result = findRecordsByQuery(props.logbook, state);
    console.log('RESULT::::', result);
    result && result.length > 0 && props.executeSearch(result);
  };

  // console.log('SEARCH RENDER:::', state);

  return (
    <div className={classes.SearchWrapper} id='search-params-wrapper'>
      <div
        className={[
          'flex-column',
          'flex-center',
          'flex-gap-20',
          classes.SearchUpper,
        ].join(' ')}
      >
        {state.length > 0 &&
          state.map((s, idx) => (
            <SearchParams
              key={idx}
              idx={idx}
              searchParam={s}
              onLabelChange={onLabelChange}
              onOperatorChange={onOperatorChange}
              onValueChange={onValueChange}
              removeParam={removeParam}
            />
          ))}
      </div>
      <div
        className={[
          'flex-center',
          'flex-row',
          'flex-gap-20',
          classes.SearchBottom,
        ].join(' ')}
      >
        <Button buttonText='+' onClick={addNewRow} type='Primary' />
        {state.length > 0 && (
          <Button
            buttonText='FIND RECORDS'
            onClick={findRecordsWithParams}
            type='Primary'
          />
        )}
      </div>
    </div>
  );
}
