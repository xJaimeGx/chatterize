// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendNum: Int
    topics: [Topic]
    friends: [User]
  }
  type Topic {
    _id: ID
    topicText: String
    createdAt: String
    username: String
    replyNum: Int
    replies: [Reply]
  }
  type Reply {
    _id: ID
    replyBody: String
    createdAt: String
    username: String
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    topics(username: String): [Topic]
    topic(_id: ID!): Topic
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTopic(topicText: String!): Topic
    addReply(topicId: ID!, replyBody: String!): Topic
    addFriend(friendId: ID!): User
  }
  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;