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

const getFileList = async (req, res) => {
    console.log(1111111111111);
    try {
        const { listSize = 10, page = 1 } = req.query;
        const fileList = await fileService.fetchFileList(parseInt(listSize), parseInt(page));
        res.json(fileList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default {
    uploadFile,
    getFileList
};
