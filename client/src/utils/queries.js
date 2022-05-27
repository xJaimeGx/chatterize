import { gql } from '@apollo/client';

export const QUERY_TOPICS = gql`
  query topics($username: String) {
    topics(username: $username) {
      _id
      topicText
      createdAt
      username
      replyNum
      replies {
        _id
        createdAt
        username
        replyBody
      }
    }
  }
`;

export const QUERY_TOPIC = gql`
  query topic($id: ID!) {
    topic(_id: $id) {
      _id
      topicText
      createdAt
      username
      replyNum
      replies {
        _id
        createdAt
        username
        replyBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendNum
      friends {
        _id
        username
      }
      topics {
        _id
        topicText
        createdAt
        replyNum
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendNum
      topics {
        _id
        topicText
        createdAt
        replyNum
        replies {
          _id
          createdAt
          replyBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendNum
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendNum
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_TOPIC = gql`
  mutation addTopic($topicText: String!) {
    addTopic(topicText: $topicText) {
      _id
      topicText
      createdAt
      username
      replyCount
      replies {
        _id
      }
    }
  }
`;

export const ADD_REPLY = gql`
  mutation addReply($topicId: ID!, $replyBody: String!) {
    addReply(topicId: $topicId, replyBody: $replyBody) {
      _id
      replyCount
      replies {
        _id
        replyBody
        createdAt
        username
      }
    }
  }
`;