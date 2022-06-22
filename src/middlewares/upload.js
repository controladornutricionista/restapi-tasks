const multer = require('multer')
const path = require("path")
const { maxSizeUpload, allowedMedia, publicFolderUploads, publicFolder } = require("../config")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./${publicFolder}/${publicFolderUploads}`);
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fullFilename = uniqueSuffix + extension
        cb(null, fullFilename)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1000000 * maxSizeUpload  // 1MB * MAX SIZE UPLOAD IN MB
    },
    fileFilter: function (req, file, cb) {
        // Allowed ext
        const filetypes = new RegExp(allowedMedia);

        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(`Error: Solo se permiten archivos ${allowedMedia}`);
        }
    }
})

module.exports = upload


