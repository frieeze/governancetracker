import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface CounterState {
    query: string;
    result: any;
}

const initialState: CounterState = {
  query: "",
  result: {},
};


export const singleAddressSlice = createSlice({
  name: 'singleAddress',
  initialState,
  reducers: {

  },
});

// export const {  } = singleAddressSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;



export default singleAddressSlice.reducer;
