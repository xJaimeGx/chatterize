import React from 'react';
import { useParams } from 'react-router-dom';
import TopicList from '../components/TopicList';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import FriendList from '../components/FriendList';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='m-3'>
      <div className="flex-row">
        <h2 className="sb-header sb-profile bold p-6">
        You are now viewing {user.username}'s profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between-lg mb-3">
        <div className="w-40">
          <TopicList topics={user.topics} title={`${user.username}'s topics...`} />
        </div>
        <div className="mb-3">
          <FriendList
            username={user.username}
            friendNum={user.friendNum}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
