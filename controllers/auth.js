import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      password,
      email,
      location,
      picturepath,
      ocupation,
      friends,
    } = req.body;

    const newuser = new User({
      firstname,
      lastname,
      password,
      email,
      location,
      picturepath,
      ocupation,
      friends,
      viewprofile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const saveduser = await newuser.save();
    res.status(201).json(saveduser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "user does not exist" });
    const ismatch = password === user.password;
    if (!ismatch) return res.status(400).json({ msg: "invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
