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
      <div className='flex-row justify-space-between'>
        <div className='w-100 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TopicList topics={topics} title="Chatterize your life!" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
