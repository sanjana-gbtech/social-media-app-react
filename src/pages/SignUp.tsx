// src/pages/SignUp.tsx

import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { User, Session } from '@supabase/supabase-js';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [name, setName] = useState('');


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Sign up the user with Supabase auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    const user = data?.user;

    if (signUpError) {
      setError(signUpError.message); // Display signup error
      return;
    }

    if (!user) {
      setError('User creation failed.');
      return;
    }

    // Step 2: Insert the user's data into the `users` table
    const { error: insertError } = await supabase
  .from('users')
  .insert([
    {
      id: data.user?.id, // Use the generated user ID
      email: data.user?.email, // Email from signup
      name: name, // Include the name
      created_at: new Date(),
    },
  ]);


    if (insertError) {
      setError(insertError.message); // Handle insertion error
    } else {
      setSuccess('Sign up successful!'); // Show success message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSignUp}>
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input
            type="text"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        <input
          type="email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Sign Up
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error */}
        {success && <p className="text-green-500 mt-2">{success}</p>} {/* Display success */}
      </form>
    </div>
  );
};

export default SignUp;