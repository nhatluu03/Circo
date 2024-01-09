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

// export const multiUpload = multer({
//   storage,
//   limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
//   fileFilter: (req, file, cb) => {
//       if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//           cb(null, true);
//       } else {
//           cb(null, false);
//           const err = new Error('Only .png, .jpg and .jpeg format allowed!')
//           err.name = 'ExtensionError'
//           return cb(err);
//       }
//   },
// })