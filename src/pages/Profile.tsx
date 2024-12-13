import React from 'react';

const Profile = () => {
  const user = {
    profilePicture: 'path_to_profile_picture',
    name: 'John Doe',
    bio: 'This is my bio.',
    followers: 120,
    following: 50,
  };

  return (
    <div className="flex items-center p-4">
      <img
        className="w-24 h-24 rounded-full"
        src={user.profilePicture}
        alt="Profile"
      />
      <div className="ml-4">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.bio}</p>
        <div className="mt-2">
          <span className="text-sm font-semibold">Followers: {user.followers}</span>
          <span className="ml-4 text-sm font-semibold">Following: {user.following}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
