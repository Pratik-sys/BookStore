const AWS = require("aws-sdk");
const s3Bucket = new AWS.S3();
const request = require("request");
module.exports = {
  imageUpload: (url, name, genere) => {
    try {
      request(
        {
          url: url,
          encoding: null,
        },
        (err, res, body) => {
          if (err) {
            throw err;
          }
          var objectParams = {
            Bucket: process.env.BUCKET_NAME,
            ContentType: "image/jpeg",
            ContentEncoding: "base64",
            ContentLength: res.headers["content-length"],
            Key: `${genere}/${name}`,
            Body: body,
            ACL: "public-read",
          };
          s3Bucket.upload(objectParams, (err, data) => {
            if (err) throw err;
            return data.Location;
          });
        }
      );
    } catch (error) {
      throw error;
    }
  },
};
