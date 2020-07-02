const fs = require("fs");

const multer = require("multer");
const { v4: uuid } = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  // it's a group of middlewares
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const path = "uploads/images";
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      console.log("multer.diskStorage.destination");
      cb(null, path);
    },
    filename: (req, file, cb) => {
      console.log("multer.diskStorage.filename");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    console.log("multer.diskStorage.fileFilter");
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
