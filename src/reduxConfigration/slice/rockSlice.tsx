import {createSlice} from '@reduxjs/toolkit';

export const DemoSlice = createSlice({
  name: 'DemoSlice',
  initialState: {
    demo: undefined,
  },
  reducers: {
    demoDataAdd: (state, action) => {
      state.demo = action.payload;
    },
  },
});

export const {demoDataAdd} = DemoSlice.actions;

export default DemoSlice.reducer;