import { LogbookType } from '@/types/database';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: LogbookType[] = [];

export const logbookSlice = createSlice({
  name: 'logbook',
  initialState,
  reducers: {
    saveLogbook: (state, action: PayloadAction<LogbookType[]>) => {
      return action.payload;
    },
  },
});

export const { saveLogbook } = logbookSlice.actions;

export default logbookSlice;
