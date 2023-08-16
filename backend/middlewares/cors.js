const allowedCors = [
  'https://api.daniilcom.nomoreparties.co',
  'https://daniilcom.nomoreparties.co',
  'http://api.daniilcom.nomoreparties.co',
  'http://daniilcom.nomoreparties.co',
  'https://api.daniilcom.nomoreparties.co/signup',
  'https://api.daniilcom.nomoreparties.co/users/me',
  'https://api.daniilcom.nomoreparties.co/cards',
  'http://localhost:3000',
  'http://localhost:4000',
  'https://51.250.73.72',
  'http://51.250.73.72',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
