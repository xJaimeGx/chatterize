import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendNum, username, friends }) => {
  if (!friends || !friends.length) {
    return <p className="no-friends p-3">You look <b>lonely</b> {username} — <b>add a friend!</b></p>;
  }

  return (
    <div>
      <h5 className='justify-right'>
        {username}'s {friendNum} {friendNum === 1 ? 'friend' : 'friends'}
      </h5>
      {friends.map(friend => (
        <button className="friend display-block mb-3 ml" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;