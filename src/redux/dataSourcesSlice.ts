import { createSlice } from '@reduxjs/toolkit';
import { ApiResponse, BatteryData } from '../types';

const initialState: Partial<ApiResponse<BatteryData[]>> = {};

export const dataSourcesSlice = createSlice({
  name: 'dataSources',
  initialState,
  reducers: {
    setDataSources: (_, action) => action.payload,
  },
});

export const { setDataSources } = dataSourcesSlice.actions;

export default dataSourcesSlice.reducer;
