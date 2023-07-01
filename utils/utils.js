import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiration, refreshTokenExpiration, refreshTokenSecretKey } from '../env.dev.js';

import fs from 'fs';
import path from 'path';

import { filesPath } from '../env.dev.js';

const generateBearerToken = (userId) => {
    return jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiration });
};

const generateRefreshToken = async (userId) => {
    return jwt.sign({ id: userId }, refreshTokenSecretKey, { expiresIn: refreshTokenExpiration });
};

const saveFile = async (tempFilePath, fileName) => {
    const targetFilePath = path.join(filesPath, fileName);
    try {
        fs.renameSync(tempFilePath, targetFilePath);
        return targetFilePath;
    } catch (error) {
        throw new Error(`Failed to save file: ${error.message}`);
    }
}

const generateFileName = (originalname) => {
    const timestamp = new Date().getTime();
    const extension = getExtension(originalname);
    return `${timestamp}.${extension}`;
};


const getExtension = (filename) => filename.split('.').pop();


export default {
    generateBearerToken,
    generateRefreshToken,
    getExtension,
    saveFile,
    generateFileName
}