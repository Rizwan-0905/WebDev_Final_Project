const User = require("../models/user");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    res.status(200).json({ message: `Welcome ${user.name}`, user });
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
