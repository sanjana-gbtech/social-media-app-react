import React from 'react';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import CreatePost from '../components/CreatePost';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Dashboard Section */}
      <div className="flex-grow bg-gray-100">
        <Dashboard />
      </div>

      {/* Create Post Section */}
      <div className="p-4 bg-white shadow-md">
        <CreatePost />
      </div>
    </div>
  );
};

export default HomePage;
