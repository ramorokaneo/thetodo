import React, { useState } from 'react';

const Login = ({ onLogin, onShowSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    
    if (username === 'user@example.com' && password === 'password') {
      setLoggedIn(true);
      onLogin();
    } else {
      alert('Invalid email or password. Please try again.');
    }
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
      <button type="submit">Login</button>
      <button type="button" onClick={onShowSignup}>Signup</button>
    </form>
  );
};

export default Login;
