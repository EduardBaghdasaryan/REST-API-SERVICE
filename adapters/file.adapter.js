import db from '../models/index.model.js';

const FileModel = db.files;

const createFile = async (fileData) => {
    try {
        return await FileModel.create(fileData);
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    createFile,
};
