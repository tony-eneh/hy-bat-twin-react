import { configureStore } from '@reduxjs/toolkit';
import batteriesReducer from './batteriesSlice';

export const store = configureStore({
  reducer: {
    battery: batteriesReducer,
  },
});
