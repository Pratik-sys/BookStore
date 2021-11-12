const AWS = require("aws-sdk");
const s3Bucket = new AWS.S3();
const request = require("request");

module.exports = {
  imageUpload: (url, name, genere) => {
    try {
      return new Promise((resolve, reject) => {
        request(
          {
            url: url,
            encoding: null,
          },
          function (err, res, body) {
            if (err) {
              reject(err);
            }
            let type = url.split(/[#?]/)[0].split(".").pop().trim();
            var objectParams = {
              Bucket: process.env.BUCKET_NAME,
              ContentType: res.headers["content-type"],
              ContentEncoding: "base64",
              ContentLength: res.headers["content-length"],
              Key: `${genere}/${name}.${type}`,
              Body: body,
              ACL: "public-read",
            };
            resolve(s3Bucket.upload(objectParams).promise());
          }
        );
      });
    } catch (error) {
      throw error;
    }
  },
  deleteImage: (data) => {
    try {
      console.log(data);
      return new Promise((resolve, reject) => {
        var objectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: data,
        };
        resolve(s3Bucket.deleteObject(objectParams).promise());
      });
    } catch (error) {
      throw error;
    }
  },
};
