const { User } = require("../models");

module.exports = {
  userDetails: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(401).json({ msg: "Please Login to see the details" });
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(404).json({ msg: "Error Fetching Details" });
    }
  },
};
