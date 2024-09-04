import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice.js';
import menuReducer from './slices/menuslice.js';
const store = configureStore({
  reducer: {
    app: appReducer,
    menu: menuReducer,
  },
});

export default store;
