// services/wordService.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRandomWord = createAsyncThunk(
  "app/getRandomWord",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data[0]; // Assuming the API returns an array with one word
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
