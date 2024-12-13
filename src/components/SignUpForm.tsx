import React, { useState } from 'react';
import { signUpUser } from '../utils/authUtils'; // Import the utility function

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Trigger Signup Process
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    const user = await signUpUser(email, password); // Use the utility function
    if (user) {
      console.log('Signup successful:', user); // Handle success
    } else {
      console.error('Signup failed'); // Handle failure
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
