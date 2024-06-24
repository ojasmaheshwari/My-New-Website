require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

const authenticateJWT = (req, res, next) => {
    const token = req.cookies?.jwt;

    if (!token) {
        return res.json({
            profileFound: false,
        });
    }

    try {
        const decoded = jwt.verify(token, ACCESS_SECRET_TOKEN);
        req.user_id = decoded.id;
        next();
    }
    catch (error) {
        console.log(error);
    }

};

router.get('/', authenticateJWT, async (req, res) => {
    if (req.user_id) {
        const user = await User.findById(req.user_id);
        res.json({
            profileFound: true,
            username: user.username,
        });
    }
});

module.exports = router;