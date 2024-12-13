import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Function to fetch session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    // Fetch initial session
    getSession();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Cleanup function to unsubscribe when the component is unmounted
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return { user };
};
