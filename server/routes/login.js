require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid user credentials" });
    }

    const token = jwt.sign({ id: user._id }, ACCESS_SECRET_TOKEN, { expiresIn: '1h' });

    res.cookie('jwt', token, {  // HTTP-Only Cookie
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'None',
        maxAge: 3600000,
    });
    console.log(process.env.NODE_ENV === "production");
    console.log(process.env.NODE_ENV);

    res.json({ message: "Logged in successfully!" });
});

module.exports = router;