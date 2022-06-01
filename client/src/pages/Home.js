import React from 'react';
import TopicForm from '../components/TopicForm';
import TopicList from '../components/TopicList';
import FriendList from '../components/FriendList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_TOPICS, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_TOPICS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const topics = data?.topics || [];
  
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='grid justify-space-between justify-left w-100'>
        <div className='chatting-corner mb-3 mlr-8 m-auto'>
          <div className='sb-header bold'>
            <h2>Chitter chatter about stuff that matters!</h2>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TopicList 
            topics={topics} 
            title="Chatting Corner" 
            />
          )}
        </div>
        <div className='new-message m-auto'>
          {loggedIn && (
            <TopicForm />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="friend-list flex-row justify-space-between-lg mb-3 justify-right">
            <FriendList
            username={userData.me.username}
            friendNum={userData.me.friendNum}
            friends={userData.me.friends}
            />
            </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
