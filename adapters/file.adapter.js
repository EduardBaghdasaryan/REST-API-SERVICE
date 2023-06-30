import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret } from '../config/authConfig';
import userModel from '../models/userModel';
import refreshTokenModel from '../models/refreshTokenModel';

const signup = async (email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ email, password: hashedPassword });
        const bearerToken = generateBearerToken(user.id);
        const refreshToken = await generateRefreshToken();
        return { bearerToken, refreshToken };
    } catch (error) {
        throw new Error('Failed to register user');
    }
};

const generateBearerToken = (userId) => {
    const bearerToken = jwt.sign({ id: userId }, secret, { expiresIn: '10m' });
    return bearerToken;
};

const generateRefreshToken = async () => {
    const refreshToken = jwt.sign({ /* Refresh token payload */ }, secret, { expiresIn: '7d' });
    await refreshTokenModel.create({ token: refreshToken });
    return refreshToken;
};

export default {
    signup,
};
