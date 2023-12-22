import { createSlice } from '@reduxjs/toolkit';
import { ApiResponse, Battery } from '../types';

const initialState: Partial<ApiResponse<Battery[]>> = {};

export const batteriesSlice = createSlice({
  name: 'batteries',
  initialState,
  reducers: {
    setBatteries: (_, action) => action.payload,
  },
});

export const { setBatteries } = batteriesSlice.actions;
export default batteriesSlice.reducer;
