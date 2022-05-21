const { Schema, model } = require('mongoose');
const replySchema = require('./Reply');
const dateFormat = require('../utils/dateFormat');

const topicSchema = new Schema(
  {
    topicText: {
      type: String,
      required: 'Please leave a topic to chat about.',
      minlength: 1,
      maxlength: 250
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    replies: [replySchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

topicSchema.virtual('replyNum').get(function() {
  return this.replies.length;
});

const Topic = model('Topic', topicSchema);

module.exports = Topic;
