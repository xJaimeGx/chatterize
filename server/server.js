const path = require('path');
const express = require('express');
const { authMiddleware } = require('./utils/auth');

// import Apollo
const { ApolloServer } = require('apollo-server-express');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, './client/public')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/public', 'index.html'));
  });
}

// use graphql schema to create a new Apollo server
const startApolloServer = async (typeDefs, resolvers) => {
await server.start();
// integrate express application as middleware
server.applyMiddleware({ app });

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// start the server
startApolloServer(typeDefs, resolvers);



