// services/canvasService.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendCanvasImage = createAsyncThunk(
  "canvas/sendCanvasImage",
  async (base64Image, { rejectWithValue }) => {
    try {
      //   const response = await core.API(
      //     core.API_METHODS.POST,
      //     "your-api-endpoint/upload",
      //     { image: base64Image }
      //   );
        const response = base64Image;
        return response;
        console.log(response);
    //   return response.data; // Assuming the response contains data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
