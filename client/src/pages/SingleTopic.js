import React from 'react';
import { useParams } from 'react-router-dom';

import ReplyList from '../components/ReplyList';
import ReplyForm from '../components/ReplyForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_TOPIC, } from '../utils/queries';
// import { QUERY_REPLY_LIST } from '../utils/queries';

const SingleTopic = (props) => {
  const { id: topicId } = useParams();

  const { loading, data } = useQuery(QUERY_TOPIC,{
    variables: { id: topicId},
  });
    
  const topic = data?.topic || {};
    
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className='reply-page'>
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {topic.username}
          </span>{' '}
          topic on {topic.createdAt}
        </p>
        <div className="card-body">
          <p>{topic.topicText}</p>
        </div>
      </div>

    <div>
      {topic.replyNum > 0 && (
      <ReplyList replies={topic.replies} />
      )}
    </div>

      <div className="new-message reply-message">
        {Auth.loggedIn() && <ReplyForm topicId={topic._id} />}
      </div>
    </div>
    </main>
  );
};

export default SingleTopic;
