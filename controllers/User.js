const { User } = require("../models");

module.exports = {
  Register: async (req, res) => {
    try {
      const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).save();
      return res.status(201).json({ msg: "User registered sucessfully !" });
    } catch (error) {
      return res.status(406).json({ msg: "Cannot register the user" });
    }
  },
  Login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ msg: "No such user available" });
      } else if (user.password === req.body.password) {
        return res.status(202).json({ msg: "User logged in sucessfully" });
      }
    } catch (error) {
      return res.status().json({ msg: "Try login with proper credentials" });
    }
  },
};
