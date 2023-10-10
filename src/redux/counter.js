import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  initialState: {
    value: 0,
  },
  name: "counter",
  reducers: {
    setCounter: (state, action) => {
      state.value = action.payload;
    },
  },
});


export const { setCounter } = counterSlice.actions

export default counterSlice.reducer;
