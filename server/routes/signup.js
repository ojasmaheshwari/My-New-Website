require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword,
			profilePicUrl: "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg",
			fullName: username,
			about: "Hey there! I am on EPIC!",
		});
    user.save()
        .then(() => res.status(201).json({ message: "Sign Up Successful" }))
        .catch(err => {
            if (err.code === 11000) { // Duplicate error
                res.status(400).json({ message: "Username or email already exists!" })
            } else {
                res.status(500).json({ message: "Whoops! Something went wrong, please try again later." })
            }
        });
});

module.exports = router;
