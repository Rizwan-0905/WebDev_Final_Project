const User = require("../models/user");

const jwt = require("jsonwebtoken");
// adjust path as needed

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    const token = user.generateJWT(); // method from model

    res.status(200).json({
      message: `Welcome ${user.name}`,
      token,
      user: {
        id: user._id,
        name: user.name,
        userName: user.userName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.makeUser = async (req, res) => {
  try {
    const user = req.body;
    const u = await User.create(user);
    res.status(201).json(u);
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const u = await User.findOneAndUpdate(
      { userName: req.query.userName },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!u) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "successfully updated", user: u });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
