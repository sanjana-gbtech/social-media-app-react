import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Import your Supabase client

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step 1: Upload the file (if any)
      let fileUrl = '';

      if (file) {
        // Upload the image to Supabase Storage
        const { data, error: uploadError } = await supabase.storage
          .from('posts') // 'posts' is the bucket name in Supabase Storage
          .upload(`public/${file.name}`, file);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        fileUrl = data?.path || ''; // Store the uploaded file URL
      }

      // Step 2: Get the currently authenticated user using getUser()
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData) {
        throw new Error('You must be logged in to create a post.');
      }

      // Get the user ID from userData.user
      const userId = userData.user.id;

      // Insert the post into the 'posts' table
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            content: description, // Post content
            image: fileUrl, // File URL (if uploaded)
            author_id: userId, // Use the user ID from supabase.auth.getUser()
          },
        ]);

      if (error) {
        throw new Error(error.message);
      }

      // Successfully posted
      console.log('Post created:', data);

      // Clear form fields
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="mt-4 flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
        <input
          type="file"
          className="p-2 rounded"
          onChange={handleFileChange}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default CreatePost;
