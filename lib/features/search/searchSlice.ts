import { ActionParams, SearchType } from '@/types/components';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultObj: SearchType = { label: 'date', operator: '=', value: '' };
const initialState: SearchType[] = [];

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchParams: (state) => {
      state.push(defaultObj);
    },
    updateSearchParams: (state, action: PayloadAction<ActionParams>) => {
      const { idx, key, value } = action.payload;
      const oldState = [...state];
      oldState[idx][key] = value;
      state = [...oldState];
    },
    removeSearchParams: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addSearchParams, updateSearchParams, removeSearchParams } =
  searchSlice.actions;

export default searchSlice;
