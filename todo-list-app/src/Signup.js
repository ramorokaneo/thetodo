import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = (event) => {
    event.preventDefault();

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      setError('Please fill in all fields.');
    } else if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
    } else {
      setError('');
      const userData = { name, email, password };
      onSignup(userData);
      setIsRegistered(true);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      {isRegistered ? (
        <p>Registration successful! Please login below.</p>
      ) : (
        <>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
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
          <button type="submit">Signup</button>
        </>
      )}
    </form>
  );
};

export default Signup;
