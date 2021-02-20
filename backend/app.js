/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const pageNotFound = require('./routes/pageNotFound');
const authRouter = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const { PORT = 3000 } = process.env;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6009e07d248d293fa065279d',
//   };

//   next();
// });

app.use('/', usersRoutes);
app.use('/', authRouter, cardsRoutes);
app.use('/', pageNotFound);

app.use(errorHandler);

app.listen(PORT, () => {
});
