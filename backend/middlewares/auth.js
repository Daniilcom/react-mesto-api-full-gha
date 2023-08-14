const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/auth-err');

const { SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }
  req.user = payload;
  next();
};
