const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./utils/errors/not-found-err');

const { PORT, DB_URL } = require('./utils/constants');

const app = express();
app.use(cors());
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const {
  validateRegister,
  validateLogin,
} = require('./middlewares/auth-validator');
const { errHandler } = require('./middlewares/err-handler');
const { createUser, login } = require('./controllers/users');

mongoose.connect(DB_URL);

app.use(express.json());
app.use(helmet());

app.use(requestLogger);

app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
