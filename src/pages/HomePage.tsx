import React from 'react';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import CreatePost from '../components/CreatePost';
import SuggestedUsers from '../components/SuggestedUsers';
import { useAuth } from '../utils/auth';

const HomePage = () => {
  const { user } = useAuth(); // Get the user object from context
  const currentUserId = user?.id; // Extract the user ID

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Section */}
      <div className="flex-grow bg-gray-100">
        <CreatePost />
        <div className="container mx-auto">
          {currentUserId && <SuggestedUsers currentUserId={currentUserId} />}
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default HomePage;
