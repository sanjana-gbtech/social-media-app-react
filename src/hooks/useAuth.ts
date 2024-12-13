import { supabase } from '../utils/supabaseClient';

const signUpUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error signing up:', error.message);
    return null;
  }

  console.log('User signed up:', data);
  return data;
};

export { signUpUser };
