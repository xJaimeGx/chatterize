const { User, Topic } = require('../models');

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('topics');
    },
    // get user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('topics');
    },
    topics: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Topic.find(params).sort({ createdAt: -1 });
    },
    topic: async (parent, { _id }) => {
      return Topic.findOne({ _id });
    }
  }
};
  
module.exports = resolvers;