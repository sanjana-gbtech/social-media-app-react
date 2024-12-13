import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <div className="text-2xl font-bold">SocialApp</div>
        <div className="space-x-4">
          <Link to="/home" className="hover:text-blue-400">Home</Link>
          <Link to="/profile" className="hover:text-blue-400">Profile</Link>
          <Link to="/settings" className="hover:text-blue-400">Settings</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
