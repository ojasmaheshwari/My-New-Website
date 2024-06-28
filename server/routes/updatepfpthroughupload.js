require("dotenv").config();

const express = require("express");
const router = express.Router();
const authenticateJWT = require("./getprofile").authenticateJWT;
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
//const rateLimit = require("express-rate-limit");

const SERVER_URL = process.env.SERVER;

// const setUploadLimit = rateLimit({
//   windowMs: 60 * 1000, // 1 min
//   max: 3,
//   keyGenerator: (req) => req.user_id,
// 	handler: (req, res, next, options) => {
// 		res.status(options.statusCode).send(options.message);
// 	},
//   message: {
//     message: "You are uploading too fast, please try again after a minute",
//   },
// });

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
});

router.use(authenticateJWT);

router.post("/", upload.single("image"), async (req, res) => {
  if (req.file) {
    const filename = req.file.filename;
    const profilePicUrl = SERVER_URL + "/uploads/" + filename;

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user_id },
      { $set: { profilePicUrl } },
      { new: true },
    );

    res.json({
      message: "File uploaded successfully",
      file: req.file,
      user: updatedUser,
    });
  } else {
    if (req.error_msg) {
      res.status(400).json({ message: req.error_msg });
    } else {
      res.status(400).json({
        message:
          "File upload failed, check if the file is an .png, .jpg, .jpeg, .gif and the file is under 2 MB",
      });
    }
  }
});

module.exports = router;
