const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const tasks = require('./routes/api/tasks');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose.connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch( (err) => console.log(err));

//routes
app.use('/api/tasks', tasks);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('found me'));
