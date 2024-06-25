require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

const authenticateJWT = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.json({
      profileFound: false,
    });
  }

  try {
    jwt.verify(token, ACCESS_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token has expired" });
        } else {
          return res
            .status(401)
            .json({ message: "Failed to authenticate token" });
        }
      }
      console.log(decoded);
      req.user_id = decoded.id;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

router.get("/", authenticateJWT, async (req, res) => {
  if (req.user_id) {
    const user = await User.findById(req.user_id);
    res.json({
      profileFound: true,
      profile: {
        username: user.username,
				profilePicUrl: user.profilePicUrl
      },
    });
  }
});

module.exports = router;