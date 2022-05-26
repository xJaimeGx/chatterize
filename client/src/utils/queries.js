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