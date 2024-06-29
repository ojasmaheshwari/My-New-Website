require("dotenv").config();

const express = require("express");
const router = express.Router();
const authenticateJWT = require("./getprofile").authenticateJWT;
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
//const rateLimit = require("express-rate-limit");

const SERVER_URL = process.env.SERVER;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

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

cloudinary.config({
  cloud_name: "dyyxmdefb",
  api_key: "545154135225526",
  api_secret: CLOUDINARY_SECRET,
});

const storage = multer.memoryStorage();

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
    const file = req.file;
    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, async (error, result) => {
        if (error) {
          return res.status(500).send(error);
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: req.user_id },
          { $set: { profilePicUrl: result.secure_url } },
          { new: true },
        );

        res.json({
          message: "File uploaded successfully",
          file: result.secure_url,
          user: updatedUser,
        });
      })
      .end(file.buffer);
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
