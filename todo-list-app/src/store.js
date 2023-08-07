import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../src/store/tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
