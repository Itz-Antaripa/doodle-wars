// slices/canvasSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendCanvasImage } from "../services/canvasService.js";

const initialState = {
  isUploading: false,
  uploadSuccess: false,
  uploadError: null,
  canvasUrl: null,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    clearUploadState: (state) => {
      state.isUploading = false;
      state.uploadSuccess = false;
      state.uploadError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCanvasImage.pending, (state) => {
        state.isUploading = true;
        state.uploadSuccess = false;
        state.uploadError = null;
      })
      .addCase(sendCanvasImage.fulfilled, (state,action) => {
        state.isUploading = false;
        state.uploadSuccess = true;
        state.canvasUrl = action.payload;
      })
      .addCase(sendCanvasImage.rejected, (state, action) => {
        state.isUploading = false;
        state.uploadError = action.payload;
      });
  },
});

export const { clearUploadState } = canvasSlice.actions;

export default canvasSlice.reducer;
