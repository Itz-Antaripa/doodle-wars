import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawHistory: [],
  historyPointer: -1,
};

export const drawingSlice = createSlice({
  name: "drawing",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      state.drawHistory = [...state.drawHistory.slice(0, state.historyPointer + 1), action.payload];
      state.historyPointer += 1;
    },
    undo: (state) => {
      if (state.historyPointer > -1) {
        state.historyPointer -= 1;
      }
    },
    redo: (state) => {
      if (state.historyPointer < state.drawHistory.length - 1) {
        state.historyPointer += 1;
      }
    },
    clearHistory: (state) => {
      state.drawHistory = [];
      state.historyPointer = -1;
    },
  },
});

export const { addToHistory, undo, redo, clearHistory } = drawingSlice.actions;

export default drawingSlice.reducer;