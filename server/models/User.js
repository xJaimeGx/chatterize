const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Valid email is required.']
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// create password using middleware
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const createPassword = 10;
    this.password = await bcrypt.hash(this.password, createPassword);
  }
  next();
});

// verify password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('friendNum').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
