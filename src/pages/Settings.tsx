import React, { useState } from 'react';

const Settings = () => {
  const [bio, setBio] = useState('');

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Handle profile picture upload
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save changes logic
    console.log('Bio updated:', bio);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Update your bio"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        type="file"
        className="p-2 rounded"
        onChange={handleProfilePictureChange}
      />
      <button className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
    </form>
  );
};

export default Settings;
