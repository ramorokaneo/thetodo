import React, { useState } from 'react';

const Login = ({ onLogin, onShowSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Basic client-side validation
    if (username.trim() === '' || password.trim() === '') {
      setError('Please fill in both email and password fields.');
    } else if (!isValidEmail(username)) {
      setError('Please enter a valid email address.');
    } else if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
    } else {
      setError(''); // Clear any previous error message
      if (username === 'user@example.com' && password === 'password') {
        setLoggedIn(true);
        onLogin();
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }
  };

  const isValidEmail = (email) => {
    // A simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
      <button type="button" onClick={onShowSignup}>Signup</button>
    </form>
  );
};

export default Login;
