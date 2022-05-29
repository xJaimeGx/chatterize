const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  authMiddleware: function({ req }) {
    // send tokens by req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }
    if (!token) {
      return req;
    }  
    try {
      // modify user data to req object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    }
    catch {
      console.log('Token is invalid');
    } 
    return req;
  }
};