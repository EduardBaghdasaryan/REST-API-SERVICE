import fileService from '../services/file.service.js';

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileId = await fileService.uploadFile(req.file);
        res.json({ fileId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default {
    uploadFile,
};
