const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/utils/db')
const morgan = require('morgan')
const loginRouter = require('./controllers/loginController');
const {User,Message} = require('./models/index');
const messageRouter = require('./controllers/messagesController');


const connect=async()=>{
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}};



connect();

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ');
}));
app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use('/api',loginRouter);
app.use('/api/messages',messageRouter);
module.exports = app