//tools
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//internal
const users = require('./routes/api/users');
const sessions = require('./routes/api/sessions');
const tasks = require('./routes/api/tasks');
const lists = require('./routes/api/lists');

const app = express();

app.use(bodyParser.json());

const db = process.env.MONGO_URI || require('./config/keys').mongoURI;
mongoose.connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch( (err) => console.log(err));

//routes
app.use('/api/users', users);
app.use('/api/sessions', sessions);
app.use('/api/tasks', tasks);
app.use('/api/lists', lists);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('found me'));
