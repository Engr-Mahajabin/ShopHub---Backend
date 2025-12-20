// const User = require("../models/User.js");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role = "user" } = req.body;
//     const exist = await User.findOne({ email });
//     if (exist) return res.status(400).json({ message: "Email already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({
//       token,
//       user: { id: user._id, name: user.name, role: user.role },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user: { id: user._id, name: user.name, role: user.role },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const Register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const checkUserRegistrationStatus = await User.findOne({ email });
    if (checkUserRegistrationStatus) {
      res
        .status(409)
        .json({ status: false, message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createNewUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await createNewUser.save();
    res
      .status(201)
      .json({ status: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error });
  }
};
