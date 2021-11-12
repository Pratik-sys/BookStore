const mongoose = require("mongoose");
const AWS = require("aws-sdk");

module.exports = {
  DBconfig: () => {
    mongoose.connect(process.env.DB_URL, (err, db) => {
      if (err) return res.staus(503).json({ msg: "DB server unavailable" });
      console.log("DB connected");
    });
  },
  awsConfig: () => {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secreteAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.REGION,
    });
  },
};
