var config = require('../config/common').config;

const util = require("util");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, config.dataPath);
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }

    //var filename = `${Date.now()}-bezkoder-${file.originalname}`;
    callback(null, filfile.originalname);
  }
});

var uploadFiles = multer({ storage: storage }).array("multi-files", 10);
var uploadFiles = util.promisify(uploadFiles);
module.exports = uploadFiles;