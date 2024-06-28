require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');

const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const blogRouter = require('./routes/blogs');
const getProfileRouter = require('./routes/getprofile');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const updateProfileRouter = require('./routes/updateprofile');
const updatePfpThroughUploadRouter = require('./routes/updatepfpthroughupload');
const uploadBlogRouter = require('./routes/uploadblog');
const getUserBlogsRouter = require('./routes/getuserblogs');
const likeBlogRouter = require('./routes/likeblog');
const postCommentRouter = require('./routes/postcomment');
const getCommentsRouter = require('./routes/getcomments');
const getBlogsInDescOrderRouter = require('./routes/getblogsindescorder');

const MONGODB_SERVER = process.env.MONGODB_SERVER;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 8000;
const MONGODB_CONNECT_STR = process.env.MONGODB_CONNECT_STR;

const app = express();

const corsOptions = {
	origin: [process.env.CLIENT_URL],
	methods: ["POST", "GET", "PUT", "OPTIONS"],
	credentials: true,
}


const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Each IP can send a max of 100 req in 15 min
});

// app.use(generalLimiter);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));    // Pre-flight options
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(PORT);
console.log("listening on ", PORT);

app.use('/blog', blogRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/getprofile', getProfileRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);
app.use('/updateprofile', updateProfileRouter);
app.use('/updatepfpthroughupload', updatePfpThroughUploadRouter);
app.use('/uploadblog', uploadBlogRouter);
app.use('/getuserblogs', getUserBlogsRouter);
app.use('/likeblog', likeBlogRouter);
app.use('/postcomment', postCommentRouter);
app.use('/getcomments', getCommentsRouter);
app.use('/getblogsindescorder', getBlogsInDescOrderRouter);

// Serve files statically from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(MONGODB_CONNECT_STR)
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log("MongoDB Error", err))
