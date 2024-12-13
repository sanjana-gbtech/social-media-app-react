import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

interface FollowButtonProps {
  currentUserId: string; // ID of the logged-in user
  targetUserId: string; // ID of the user to be followed/unfollowed
}

const FollowButton: React.FC<FollowButtonProps> = ({ currentUserId, targetUserId }) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null); // 'null' to handle loading state
  const [loading, setLoading] = useState(false); // To track if the action is in progress
  const [error, setError] = useState<string | null>(null); // To track any errors during follow/unfollow actions

  // Check if the current user is following the target user
  useEffect(() => {
    const fetchFollowStatus = async () => {
      setLoading(true); // Start loading
      const { data, error } = await supabase
        .from('followers')
        .select('*')
        .eq('follower_id', currentUserId)
        .eq('following_id', targetUserId);

      if (error) {
        setError('Error fetching follow status');
      } else {
        setIsFollowing(data.length > 0);
      }

      setLoading(false); // End loading
    };

    fetchFollowStatus();
  }, [currentUserId, targetUserId]);

  // Handle follow/unfollow actions
  const handleFollow = async () => {
    setLoading(true); // Start loading while the action is in progress
    setError(null); // Reset error message

    if (isFollowing) {
      // Unfollow
      const { error } = await supabase
        .from('followers')
        .delete()
        .eq('follower_id', currentUserId)
        .eq('following_id', targetUserId);

      if (error) {
        setError('Error unfollowing user');
      } else {
        setIsFollowing(false);
      }
    } else {
      // Follow
      const { error } = await supabase.from('followers').insert([
        {
          follower_id: currentUserId,
          following_id: targetUserId,
        },
      ]);

      if (error) {
        setError('Error following user');
      } else {
        setIsFollowing(true);
      }
    }

    setLoading(false); // End loading after action
  };

  // If the follow status is still loading, disable the button
  if (isFollowing === null) {
    return <button disabled className="px-4 py-2 rounded bg-gray-500 text-white">Loading...</button>;
  }

  return (
    <div>
      <button
        onClick={handleFollow}
        disabled={loading} // Disable button while loading
        className={`px-4 py-2 rounded ${isFollowing ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {loading ? 'Processing...' : isFollowing ? 'Unfollow' : 'Follow'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FollowButton;
