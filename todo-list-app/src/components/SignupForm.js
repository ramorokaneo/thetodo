import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/userReducer';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic using your backend or authentication service
    // For simplicity, we'll just set the user data directly here
    const userData = { email, password };
    dispatch(setUser(userData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
