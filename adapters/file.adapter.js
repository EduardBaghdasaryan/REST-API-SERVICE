import db from '../models/index.model.js';
import fs from 'fs'
import utils from '../utils/utils.js';
import { filesPath } from '../env.dev.js';

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

const updateFileById = async (id, file) => {
    try {
        const existingFile = await FileModel.findOne({ where: { id } });

        if (!existingFile) {
            throw new Error('File not found');
        }

        const oldFilePath = existingFile.path;
        
        await utils.deleteFileFromStorage(oldFilePath)

        const updatedFile = await existingFile.update({
            name: file.originalname,
            path: file.path,
        });

        return updatedFile;
    } catch (error) {
        throw new Error('Failed to update the file in the database');
    }
};
export default {
    createFile,
    getFileListFromDB,
    getFileById,
    deleteFile,
    updateFileById
};
