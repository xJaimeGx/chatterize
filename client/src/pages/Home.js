import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TOPICS } from '../utils/queries';
import TopicList from '../components/TopicList';

const Home = () => {
  // make query request
  const { loading, data } = useQuery(QUERY_TOPICS);
  // get topic data from query response
  const topics = data?.topics || [];
    console.log(topics);

  return (
    <main>
      <div className='flex-row justify-space-between justify-left w-100'>
        <div className='w-30 mb-3 float-left m-auto'>
          <div className='sb-header bold'>
            <h2>Chitter chatter about stuff that matters!</h2>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TopicList topics={topics} title="" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
