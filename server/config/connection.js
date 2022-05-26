const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chatterize', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('MongoDB Connected!'))
  .catch(error => console.log('MongoDB did not connect: ', error));

module.exports = mongoose.connection;
