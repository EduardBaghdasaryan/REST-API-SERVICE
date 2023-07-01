import fileAdapter from '../adapters/file.adapter.js';

import utils from '../utils/utils.js';

const uploadFile = async (fileData) => {
    try {
        const { filename } = fileData;

        const file = {
            name: filename,
            extension: utils.getExtension(filename),
            mimeType: fileData.mimetype,
            size: fileData.size,
            uploadDate: new Date(),
        };

        return await fileAdapter.createFile(file);
    } catch (error) {
        throw new Error(error);
    }
};

const fetchFileList = async (listSize, page) => {
    try {
        const offset = (page - 1) * listSize;
        return await fileAdapter.getFileListFromDB(listSize, offset);
    } catch (error) {
        throw new Error(error);
    }
};

const deleteFile = async (id) => {
    try {

        const file = await fileAdapter.getFileById(id);
        if (!file) {
            throw new Error('File not found');
        }
        await fileAdapter.deleteFile(id);
        await utils.deleteFileFromStorage(file.name);
    } catch (error) {
        throw new Error(error);
    }
};


const getFileById = async (id) => {
    try {
        return await fileAdapter.getFileById(id);
    } catch (error) {
        throw new Error('Failed to retrieve the file from the database');
    }
};

const updateFile = async (id, file) => {
    try {
        return await fileAdapter.updateFileById(id, file);

    } catch (error) {
        throw new Error('Failed to update the file in the database');
    }
};

export default {
    uploadFile,
    fetchFileList,
    deleteFile,
    getFileById,
    updateFile
};
