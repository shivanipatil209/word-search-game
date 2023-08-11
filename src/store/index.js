import { configureStore } from '@reduxjs/toolkit';
import gridReducer from '../reducers/gridSlice';

export default configureStore({
  reducer: {
    grid: gridReducer,
  },
});
