const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  Register: async (req, res) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      await new User({
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
      if (!user) {
        return res.status(404).json({ msg: "No such user available" });
      }
      const comparehash = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (comparehash) {
        const payload = {
          id: user.id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 315556926,
        });
        return res.status(202).json({
          sucess: true,
          token: `Bearer ${token}`,
        });
      } else {
        return res
          .status(406)
          .json({ msg: "Opps! you entered incorrect password" });
      }
    } catch (error) {
      return res.status(404).json({ msg: "Try login with proper credentials" });
    }
  },
};
