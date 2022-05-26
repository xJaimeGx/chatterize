import React from 'react';
import { Link } from 'react-router-dom';
import { ReplyList } from '../ReplyList';  //<---fix the quotes//

const TopicList = ({ topics, title }) => {
  if (!topics.length) {
    return <h3>Nothing to say.</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {topics &&
        topics.map(topic => (
          <div key={topic._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${topic.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {topic.username}
              </Link>{' '}
              topic on {topic.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/topic/${topic._id}`}>
                <p>{topic.topicText}</p>
              </Link>
            </div>
            <div className='card-footer justify-right'>
              <Link to={`/topic/${topic._id}`}>
                <p className="mb-0">
                  Replies: {topic.replyNum} || <i>Click to{' '}
                {topic.replyNum ? 'see' : 'start'} the chat!</i>
                </p>
              </Link>
            </div>
            
          </div>
        ))}
    </div>
  );
};

export default TopicList;