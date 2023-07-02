import bcrypt from 'bcrypt';
import utils from '../utils/utils.js'
import validator from 'validator';
import userAdapter from '../adapters/user.adapter.js';
import tokensAdapter from '../adapters/tokens.adapter.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../env.dev.js';

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

        const tokens = {
            bearerToken: await utils.generateBearerToken(user.id),
            refreshToken: await utils.generateRefreshToken(user.id),
        };

        await tokensAdapter.createToken(user.id, tokens.bearerToken)

        return tokens;
    } catch (error) {
        throw new Error(error.message);
    }
};

const signin = async (email, phoneNumber, password) => {
    try {
        let user;

        if (email) {
            user = await userAdapter.findUserByEmail(email);
        } else {
            user = await userAdapter.findUserByPhoneNumber(phoneNumber);
        }

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Invalid credentials');
        }

        const tokens = {
            bearerToken: await utils.generateBearerToken(user.id),
            refreshToken: await utils.generateRefreshToken(user.id),
        };

        await tokensAdapter.createToken(user.id, tokens.bearerToken)

        return tokens;
    } catch (error) {
        throw new Error(error);
    }
}

const refreshBearerToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, jwtSecret);

        console.log(decoded);

        if (!decoded || !decoded.id) {
            throw new Error('Invalid refresh token');
        }

        const user = await userAdapter.findUserById(decoded.id);

        if (!user) {
            throw new Error('User not found');
        }

        const bearerToken = utils.generateBearerToken(user.id);

        return {
            bearerToken,
            refreshToken: await utils.generateRefreshToken(user.id),
        };
    } catch (error) {
        throw new Error(error.message);
    }
};



export default {
    signup,
    signin,
    refreshBearerToken
};
