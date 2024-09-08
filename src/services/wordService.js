// services/wordService.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRandomWord = createAsyncThunk(
  "app/getRandomWord",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://doodle-wars-backend.vercel.app/random-word"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.word; // Assuming the API returns an array with one word
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
