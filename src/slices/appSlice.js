import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  word: "Sun",
  action: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setWord(state, action) {
      state.word = action.payload;
    },
    setAction(state, action) {
      state.action = action.payload;
    },
  },
});

export const { setWord, setAction } = appSlice.actions;
export default appSlice.reducer;
