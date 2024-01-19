import multer from "multer";

// Define a function to create dynamic storage based on the provided path
export const createStorage = (destinationPath) => multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = (destinationPath) => multer({ storage: createStorage(destinationPath) });

export const multiUpload = (destinationPath) => multer({
  storage: createStorage(destinationPath),
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .png, .jpg, and .jpeg formats are allowed!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  },
});
