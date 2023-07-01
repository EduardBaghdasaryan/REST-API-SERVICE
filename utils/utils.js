import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiration } from '../env.dev.js';

const generateBearerToken = (userId) => {
    return jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiration });
};

const generateRefreshToken = async (userId) => {
    return jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiration });
};

export default {
    generateBearerToken,
    generateRefreshToken
}