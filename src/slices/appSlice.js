import { createSlice } from "@reduxjs/toolkit";
import { getRandomWord } from "../services/wordService";
const initialState = {
  word: null,
  action: null,
  status: "idle", // To handle the loading state
  error: null, // To handle potential errors
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
  extraReducers: (builder) => {
    builder
      .addCase(getRandomWord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRandomWord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.word = action.payload;
      })
      .addCase(getRandomWord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setWord, setAction } = appSlice.actions;
export default appSlice.reducer;
