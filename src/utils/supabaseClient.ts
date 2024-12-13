import { createClient } from '@supabase/supabase-js';



const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ebwpizclkufhnlkskzzj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVid3BpemNsa3VmaG5sa3NrenpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MjEwMjcsImV4cCI6MjA0OTQ5NzAyN30.QHnE7punVrr-j4eOV5A8us223ltxHqrMWmltuzpmC20';
console.log('Supabase URL:',supabaseUrl );
console.log('Supabase ANON KEY:', supabaseAnonKey);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

