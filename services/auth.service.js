import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../env.dev.js';
import { jwtExpiration } from '../env.dev.js';
import validator from 'validator';
import userAdapter from '../adapters/user.adapter.js';



const signup = async (identifier, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        let existingUser;
        if (identifier === 'email') {
            existingUser = await userAdapter.findUserByEmail(identifier);
            if (!validator.isEmail(identifier)) {
                throw new Error('Invalid email format');
            }
        } else {
            existingUser = await userAdapter.findUserByPhoneNumber(identifier);
        }

        if (existingUser) {
            throw new Error(`User with the provided ${identifier === 'email' ? 'email' : 'phone number'} already exists`);
        }

        const user = identifier === 'email'
            ? await userAdapter.emailSignup(identifier, hashedPassword)
            : await userAdapter.phoneNumberSignup(identifier, hashedPassword);

        const bearerToken = generateBearerToken(user.id);
        const refreshToken = await generateRefreshToken();

        return { bearerToken, refreshToken };
    } catch (error) {
        throw new Error(error.message);
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
