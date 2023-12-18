import { configureStore } from '@reduxjs/toolkit';
import batteriesReducer from './batteriesSlice';
import dataSourcesSlice from './dataSourcesSlice';

export const store = configureStore({
  reducer: {
    battery: batteriesReducer,
    dataSource: dataSourcesSlice
  },
});
