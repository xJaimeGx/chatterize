import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Particle from './components/particleBackground';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SingleTopic from './pages/SingleTopic';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route exact
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/profile/:username"
                element={<Profile />}
              />
              <Route
                path="/topic/:id"
                element={<SingleTopic />}
              />
              <Route
                path="*"
                element={<NoMatch />}
              />
            </Routes> 
          <div>
        <Particle />
        </div>
        </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
