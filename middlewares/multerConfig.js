import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'files/',
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

export default upload;
