import jwt from 'jsonwebtoken';
import {
  jwtSecret,
  jwtExpiration,
  refreshTokenExpiration,
  refreshTokenSecretKey,
} from '../env.dev.js';
import fs from 'fs';
import path from 'path';

import { filesPath } from '../env.dev.js';

const generateBearerToken = async userId => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiration });
};

const generateRefreshToken = async userId => {
  return jwt.sign({ id: userId }, refreshTokenSecretKey, {
    expiresIn: refreshTokenExpiration,
  });
};

const getExtension = filename => filename.split('.').pop();

const deleteFileFromStorage = filename => {
  const filePath = path.join(filesPath, filename);
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, error => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve();
      }
    });
  });
};

export default {
  generateBearerToken,
  generateRefreshToken,
  getExtension,
  deleteFileFromStorage,
};
