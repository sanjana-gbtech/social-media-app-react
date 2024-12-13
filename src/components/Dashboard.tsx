// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Post } from '../types/types'; // Import the Post interface

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Using Post type for posts state

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts') // Fetch posts from Supabase
        .select('*');
      if (data) {
        setPosts(data); // TypeScript knows that data is of type Post[]
      } else {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
        <h1>Welcome to dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <p className="text-gray-600">{post.content}</p>
            <div className="mt-2 flex items-center justify-between">
              <button className="text-blue-500">Like</button>
              <button className="text-blue-500">Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
