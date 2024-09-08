import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice.js';
import menuReducer from './slices/menuslice.js';
import canvasReducer from './slices/canvasSlice.js';
import drawingReducer from './slices/drawingSlice.js';
const store = configureStore({
  reducer: {
    app: appReducer,
    menu: menuReducer,
    canvas: canvasReducer,
    drawing: drawingReducer,
  },
});

export default store;
