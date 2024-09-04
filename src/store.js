import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice.js';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
