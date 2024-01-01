import multer from "multer";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/artworks/"); // Specify the directory where the files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Use a unique filename
  },
});

export const upload = multer({ storage: storage });
