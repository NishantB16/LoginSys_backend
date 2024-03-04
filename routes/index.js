/* Routing for user related apis (new user and login)*/
const express = require("express");
const router = express.Router();
const zod = require("zod");
const mongoose = require("mongoose");
const User = require("../db");
const { JWT_SECRET } = require("../cofig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSignup = zod.object({
  name: zod.string(),
  dateofbirth: zod.date(),
  email: zod.string().email(),
  password: zod.string(),
});
router.post("/newuserregister", async function (req, res) {
  const parsedBody = userSignup.safeParse(req.body);
  if (!parsedBody) {
    return res.status(411).json({
      msg: "invalid inputs",
    });
  }
  const existingUser = await User.findOne({
    email: req.body.email,
  });
  if (existingUser) {
    return res.status(411).json({
      msg: "Email already taken",
    });
  }
  const hashed = await bcrypt.hash(req.body.password, saltRounds); //password is hashed
  if (hashed) {
    console.log("Password hashed successfully");
  }
  const createUser = await User.create({
    name: req.body.name,
    password: hashed,
    dateofbirth: req.body.dateofbirth,
    email: req.body.email,
  });
  if (createUser) {
    const userIdforJwt = createUser._id;
    console.log("Userid from db", userIdforJwt);
    const token = jwt.sign({ userId: userIdforJwt }, JWT_SECRET);
    return res.status(200).json({
      msg: "User successfully Created",
      token,
    });
  } else if (!createUser) {
    return res.status(411).json({
      msg: "Error while creating user",
    });
  }
});
const siginInfo = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
router.post("/signin", async function (req, res) {
  const signin = siginInfo.safeParse(req.body);
  if (!signin) {
    return res.status(411).json({
      msg: "Unable to parse body",
    });
  }
  const finduser = await User.findOne({
    email: req.body.email,
  });
  if (!finduser) {
    return res.status(411).json({
      msg: "Invalid mail or password",
    });
  }
  const hashedPassword = finduser.password;
  const passwordMatch = await bcrypt.compare(req.body.password, hashedPassword);
  //checking if the passwords match
  if (passwordMatch) {
    idForjwt = finduser._id;
    console.log("Database id of the user loging in is: ", idForjwt);
    const token = jwt.sign({ userId: finduser._id }, JWT_SECRET);
    return res.status(200).json({
      msg: "Logged in successfully",
      token,
    });
  } else {
    return res.status(411).json({
      msg: "Invalid Credentials",
    });
  }
});
module.exports = router;
