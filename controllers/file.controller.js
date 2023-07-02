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
        res.status(500).json({ error: 'Failed to upload file' });
    }
};

const getFileList = async (req, res) => {
    try {
        const { listSize = 10, page = 1 } = req.query;
        const fileList = await fileService.fetchFileList(parseInt(listSize), parseInt(page));
        res.json(fileList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch file list' });
    }
};

const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        await fileService.deleteFile(id);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete file' });
    }
};

const getFileById = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await fileService.getFileById(id);
        res.json(file);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get file' });
    }
};

const downloadFileById = async (req, res) => {
    try {
        const { id } = req.params;
        const { path } = await fileService.getFileById(id);
        const result = `${filesPath}/${path}`

        res.download(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to download file' });
    }
};

const updateFileById = async (req, res) => {
    try {
        const { id } = req.params;
        const { file } = req;

        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const updatedFile = await fileService.updateFile(id, file);

        res.json(updatedFile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update file' });
    }
};

export default {
    uploadFile,
    getFileList,
    deleteFile,
    getFileById,
    downloadFileById,
    updateFileById
};
