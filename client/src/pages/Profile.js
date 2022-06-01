import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import TopicForm from '../components/TopicForm';
import TopicList from '../components/TopicList';
import FriendList from '../components/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = (props) => {
  const { username: userParam } = useParams();
  const [addFriend] = useMutation(ADD_FRIEND);
  
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn () && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. 
        Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='m-profile'>
      <div className='sb-header sb-profile bold'>
        <h2 className="align-center">
          {userParam ? `${user.username}'s` : 'Your'} chitter central!
        </h2>
        
          {userParam && (
            <button className="friend-btn submit" onClick={handleClick}>
            Add Friend
          </button>
          )}
      </div>

      <div className="grid justify-space-between-lg mlr-1">
        <div>
          <TopicList 
          topics={user.topics} 
          title={`${user.username}'s current chats...`} 
          />
        </div>

      <div className='new-message m-auto profile-message'>
        {!userParam && (
          <div>
          <TopicForm />
        </div>
      )}
      </div>
      

          <div className="friend-list flex-row mb-3 justify-right profile-friend">
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
