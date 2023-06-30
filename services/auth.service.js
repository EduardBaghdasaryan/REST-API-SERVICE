import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../env.dev.js';
import { jwtExpiration } from '../env.dev.js';

import db from '../models/index.model.js';

const UsersModel = db.users;


const signup = async (email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UsersModel.create({ email, password: hashedPassword });
        const bearerToken = generateBearerToken(user.id);
        const refreshToken = await generateRefreshToken();
        return { bearerToken, refreshToken };
    } catch (error) {
        throw new Error('Failed to register user');
    }
};

const generateBearerToken = (userId) => {
    const bearerToken = jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiration });
    return bearerToken;
};

const generateRefreshToken = async () => {
    const refreshToken = jwt.sign({}, jwtSecret, { expiresIn: jwtExpiration });
    return refreshToken;
};

export default {
    signup,
};
