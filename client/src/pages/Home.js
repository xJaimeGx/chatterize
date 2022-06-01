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
      <div className='flex-row justify-space-between justify-left w-100'>
        {loggedIn && (
          <div className="col-12 mb-3">
            <TopicForm />
          </div>
        )}
        <div className='w-30 mb-3 float-left m-auto'>
          <div className={`${loggedIn && 'sb-header bold'}`}>
            <h2>Chitter chatter about stuff that matters!</h2>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TopicList 
            topics={topics} 
            title="insert snappy thing here" 
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="flex-row justify-space-between-lg mb-3">
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
