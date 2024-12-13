import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Import your Supabase client

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

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
      let fileUrl = '';

      if (file) {
        const { data, error: uploadError } = await supabase.storage
          .from('posts')
          .upload(`public/${file.name}`, file);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        fileUrl = data?.path || '';
      }

      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData) {
        throw new Error('You must be logged in to create a post.');
      }

      const userId = userData.user.id;

      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            content: description,
            image: fileUrl,
            author_id: userId,
          },
        ]);

      if (error) {
        throw new Error(error.message);
      }

      console.log('Post created:', data);

      setTitle('');
      setDescription('');
      setFile(null);
      setIsModalOpen(false); // Close the modal after submission
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end w-[95%] mt-2">
    {/* Button to Open Modal */}
    <button
      onClick={() => setIsModalOpen(true)}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Create Post
    </button>
  
    {/* Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-100 relative"> {/* Added relative positioning here */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times; {/* Close button */}
          </button>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            {/* <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            /> */}
            <textarea
              placeholder="What's in your mind?"
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
                {loading ? 'Posting...' : 'Add Post'}
              </button>
              <input
                type="file"
                className="p-2 rounded"
                onChange={handleFileChange}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default CreatePost;
