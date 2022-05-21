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