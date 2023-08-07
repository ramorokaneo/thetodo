import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}!</h1>
          <TodoForm />
          <TodoList />
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <LoginForm />
          <h1>Signup</h1>
          <SignupForm />
        </div>
      )}
    </div>
  );
};

export default App;
