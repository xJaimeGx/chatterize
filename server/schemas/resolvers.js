const { User, Topic } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({_id: coontext.user._id})
          .select('-__v _password')
          .populate('topics')
          .populate('friends');
        return userData;
      }
      throw new AuthenticationError('Not logged in');          
    },
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
  },
  Mutation: {
      addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
          return { token, user };        
      },
      login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });

          if (!user) {
              throw new AuthenticationError('Wrong Credentials');
          }

          const validPassword = await user.isCorrectPassword(password);

          if (!validPassword) {
              throw new AuthenticationError('Wrong Credentials');
          }
          const token = signToken(user);
          return { token, user };
      },
      addTopic: async (parent, args, context) => {
        if (context.user) {
          const topic = await Topic.create({ ...args, username: context.user.username });      
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { topics: topic._id } },
            { new: true }
          );      
          return topic;
        }
      
        throw new AuthenticationError('Login required!');
      },
      addReply: async (parent, { topicId, replyBody }, context) => {
        if (context.user) {
          const updatedTopic = await Topic.findOneAndUpdate(
            { _id: topicId },
            { $push: { reactions: { reactionBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );
      
          return updatedTopic;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addFriend: async (parent, { friendId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate('friends');
      
          return updatedUser;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      }
  }
};
  
module.exports = resolvers;