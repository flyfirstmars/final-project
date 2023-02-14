import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 0,
  score: 0,
};

const resultReducer = createSlice({
  name: "result",
  initialState,
  reducers: {
    testStarted(state) {
      state.time = 0;
      state.score = 0;
    },
    testFinished(state, action) {
      state.time = action.payload.time;
      state.score = action.payload.score;
    },
  },
});

export const { testStarted, testFinished } = resultReducer.actions;

export default resultReducer.reducer;
