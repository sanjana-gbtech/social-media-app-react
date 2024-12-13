import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import FollowButton from './FollowButton';
import userProfile from '../assets/user.jpg';

interface User {
  id: string;
  name: string;
  profile_picture: string | null;
}

const SuggestedUsers: React.FC<{ currentUserId: string }> = ({ currentUserId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        // Get users excluding the current user
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .neq('id', currentUserId); // Exclude current user

        if (error) {
          setError('Error fetching users: ' + error.message);
        } else {
          setUsers(data || []);
        }
      } catch (err) {
        setError('Unexpected error: ' + err);
      }
    };

    fetchSuggestedUsers();
  }, [currentUserId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">  {/* Use grid layout with 4 columns */}
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
            {/* Card content */}
            <div className="flex items-center mb-2">
              <img
                src={userProfile || 'default-profile.jpg'}
                alt={user.name}
                className="w-16 h-16 rounded-full mr-2"
              />
              <span className="font-bold">{user.name}</span>
            </div>
            {/* Follow button */}
            <FollowButton currentUserId={currentUserId} targetUserId={user.id} />
          </div>
        ))
      ) : (
        <p className="text-center">No users found</p>
      )}
    </div>
  );
};

export default SuggestedUsers;