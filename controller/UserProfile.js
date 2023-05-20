const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createUserProfile = async (req, res, next) => {
  try {
    // creating a userProfile
    const newUser = new User({ ...req.body });
    await newUser.save();

    // generating token while in registering
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res
      .cookie("access_token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ ...req.body });
  } catch (err) {
    return res.send(err);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    return res.status(200).send({ ...user });  } catch (err) {
    return res.send(err);
  }
};

module.exports = { createUserProfile, getUserInfo };
