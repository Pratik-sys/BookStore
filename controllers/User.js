const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  Register: async (req, res) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      }).save();
      return res.status(201).json({ msg: "User registered sucessfully !" });
    } catch (error) {
      return res.status(406).json({ msg: "Cannot register the user" });
    }
  },
  Login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      comparehash = await bcrypt.compare(user.password, req.body.password);
      if (!user) {
        return res.status(404).json({ msg: "No such user available" });
      } else if (comparehash) {
        return res.status(202).json({ msg: "User logged in sucessfully" });
      }
    } catch (error) {
      console.log(error)
      return res.status(404).json({ msg: "Try login with proper credentials" });
    }
  },
};
