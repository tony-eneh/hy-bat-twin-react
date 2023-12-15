import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiResponse, ApiStatus, Battery } from '../models';
import { headers } from '../helpers';

const initialState: { status: ApiStatus; data: Battery[] } = {
  status: ApiStatus.PENDING,
  data: [],
};

export const batteriesSlice = createSlice({
  name: 'batteries',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBatteries.pending, (state) => {
        state.status = ApiStatus.PENDING;
      })
      .addCase(getBatteries.rejected, (state) => {
        state.status = ApiStatus.ERROR;
      })
      .addCase(getBatteries.fulfilled, (state, action) => {
        state.status = ApiStatus.SUCCESS;
        state.data = action.payload.data;
      });
  },
});

export const getBatteries = createAsyncThunk('batteries/get', async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/batteries`, {
    headers,
  });
  const data = (await res.json()) as ApiResponse<Battery[]>;
  return data;
});

export default batteriesSlice.reducer;
