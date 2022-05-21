import React from 'react';

const TopicList = ({ topics, title }) => {
  if (!topics.length) {
    return <h3>No Topics</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {topics &&
        topics.map(topic => (
          <div key={topic._id} className="card mb-3">
            <p className="card-header">
              {topic.username}
              topic on {topic.createdAt}
            </p>
            <div className="card-body">
              <p>{topic.topicText}</p>
              <p className="mb-0">
                Replies: {topic.replyNum} || Click to{' '}
                {topic.replyNum ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TopicList;