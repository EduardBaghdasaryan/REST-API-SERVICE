import db from '../models/index.model.js';

const FileModel = db.files;

const createFile = async (fileData) => {
    try {
        return await FileModel.create(fileData);
    } catch (error) {
        throw new Error(error.message);
    }
};

const getFileListFromDB = async (listSize, offset) => {
    try {
        return await FileModel.findAll({
            limit: listSize,
            offset: offset
        });
    } catch (error) {
        throw new Error(error);
    }
};

export default {
    createFile,
    getFileListFromDB
};
