import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducers/todoReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
});

export default store;
