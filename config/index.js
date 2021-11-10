const mongoose = require("mongoose");
const AWS = require("aws-sdk");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, REGION } = process.env;

module.exports = {
  DBconfig: () => {
    mongoose.connect(process.env.DB_URL, (err, db) => {
      if (err) return res.staus(503).json({ msg: "DB server unavailable" });
      console.log("DB connected");
    });
  },
  awsConfig: () => {
    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secreteAccessKey: AWS_SECRET_ACCESS_KEY,
      region: REGION,
    });
  },
};
