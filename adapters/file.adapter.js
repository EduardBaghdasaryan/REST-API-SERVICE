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
        console.log(333333333333);

        return await FileModel.find().limit(listSize).skip(offset).exec();
    } catch (error) {
        throw new Error('Failed to retrieve file list from the database');
    }
};

export default {
    createFile,
    getFileListFromDB
};
