import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email, password: $password) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
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