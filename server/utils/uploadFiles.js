import multer from "multer";


export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ".././client/public/uploads/artworks");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({ storage: storage });