import { configureStore } from '@reduxjs/toolkit';
import batteriesReducer from './batteriesSlice';
import dataSourcesSlice from './dataSourcesSlice';

export const store = configureStore({
  reducer: {
    batteries: batteriesReducer,
    dataSources: dataSourcesSlice,
  },
});
