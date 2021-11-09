const mongoose = require("mongoose");

module.exports = {
  DBconfig: () => {
    mongoose.connect(process.env.DB_URL, (err, db) => {
      if (err) return res.staus(503).json({ msg: "DB server unavailable" });
      console.log("DB connected");
    });
  },
};
