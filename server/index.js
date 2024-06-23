require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const blogRouter = require('./routes/blogs');

const MONGODB_SERVER = process.env.MONGODB_SERVER;
const DB_NAME = process.env.DB_NAME;
const HOST = "http://localhost";
const PORT = process.env.PORT || 8000;

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));    // Pre-flight options
app.use(bodyParser.json());

app.listen(PORT);

app.use('/blog', blogRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

mongoose.connect(MONGODB_SERVER + DB_NAME)
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log("MongoDB Error", err))