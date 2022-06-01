import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TOPIC } from '../utils/queries';
import ReplyList from '../components/ReplyList';

const SingleTopic = props => {
  
  const { id: topicId } = useParams();

  const { loading, data } = useQuery(QUERY_TOPIC, {
    variables: { id: topicId }
  });
    
  const topic = data?.topic || {};
    
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-topic" style={{  width:"500px",
    height: "100%", marginLeft:"30%"}}>
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
      {topic.replyNum > 0 && <ReplyList replies={topic.replies} />}
    </div>
  );
};

export default SingleTopic;
