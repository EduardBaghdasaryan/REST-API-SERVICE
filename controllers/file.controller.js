import fileService from '../services/file.service.js';
import { filesPath } from '../env.dev.js';


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
    try {
        const { listSize = 10, page = 1 } = req.query;
        const fileList = await fileService.fetchFileList(parseInt(listSize), parseInt(page));
        res.json(fileList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        await fileService.deleteFile(id);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getFileById = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await fileService.getFileById(id);
        res.json(file);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const downloadFileById = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await fileService.getFileById(id);
        const result = `${filesPath}/${file.name}`

        res.download(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default {
    uploadFile,
    getFileList,
    deleteFile,
    getFileById,
    downloadFileById
};
