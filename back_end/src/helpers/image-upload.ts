import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

//Destination to store the image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "others";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    const uploadPath = path.join(__dirname, "..", "public", "images", folder);

    ensureDir(uploadPath);

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

export const imageUpload = multer({
  storage: imageStorage,

  fileFilter(req, file, cb) {
    if (!file.originalname.startsWith("image/")) {
      return cb(new Error("Por favor, envie apenas imagens!"));
    }

    cb(null, true);
  },
});
