import db from '../models/index.model.js';

const FileModel = db.files;

const createFile = async (fileData) => {
    try {
        console.log(1111111111);
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

const getFileById = async (id) => {
    try {
        return await FileModel.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
};

const deleteFile = async (id) => {
    try {
        await FileModel.destroy({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
};

export default {
    createFile,
    getFileListFromDB,
    getFileById,
    deleteFile
};
