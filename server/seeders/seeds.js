const faker = require('faker');

const db = require('../config/connection');
const { Topic, User } = require('../models');

db.once('open', async () => {
  await Topic.deleteMany({});
  await User.deleteMany({});

  // create userData
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const userIndex = Math.floor(Math.random() * createUsers.ops.length);
    const { _id: userId } = createUsers.ops[userIndex];

    let friendId = userId;

    while (friendId === userId) {
      const userIndex = Math.floor(Math.random() * createUsers.ops.length);
      friendId = createUsers.ops[userIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create topics
  let createTopics = [];
  for (let i = 0; i < 100; i += 1) {
    const topicText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const userIndex = Math.floor(Math.random() * createUsers.ops.length);
    const { username, _id: userId } = createUsers.ops[userIndex];

    const createTopic = await Topic.create({ topicText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { topics: createTopic._id } }
    );

    createTopics.push(createTopic);
  }

  // create replies
  for (let i = 0; i < 100; i += 1) {
    const replyBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const userIndex = Math.floor(Math.random() * createUsers.ops.length);
    const { username } = createUsers.ops[userIndex];

    const topicIndex = Math.floor(Math.random() * createTopics.length);
    const { _id: topicId } = createTopics[topicIndex];

    await Topic.updateOne(
      { _id: topicId },
      { $push: { replies: { replyBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
