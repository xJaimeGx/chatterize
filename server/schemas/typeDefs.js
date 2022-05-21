// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
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
type User {
    _id: ID
    username: String
    email: String
    friendNum: Int
    topics: [Topic]
    friends: [User]
}
type Query {
    users: [User]
    user(username: String): Topic
    topics(username: String): [Topic]
    topic(_id: ID!): Topic
  }
`;

// export the typeDefs
module.exports = typeDefs;