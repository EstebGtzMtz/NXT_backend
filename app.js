require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const session = require('express-session');
const passport = require('./config/passport');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    credentials: true,
    origin: [process.env.FRONTENDPOINT]
}));

const auth = require('./routes/auth')
const toDo = require('./routes/toDo');
app.use('/', auth);
app.use('/', toDo);

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err, res) => {
    if (err) throw err;

    console.log(`Conected to DB`)
});

app.listen(process.env.PORT, () => {
    console.log(`Server online on port ${process.env.PORT} ready to work `)
});

module.exports = app;