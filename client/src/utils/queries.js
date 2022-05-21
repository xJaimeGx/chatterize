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