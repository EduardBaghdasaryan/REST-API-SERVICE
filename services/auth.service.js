import bcrypt from 'bcrypt';
import utils from '../utils/utils.js'
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

        const bearerToken = utils.generateBearerToken(user.id);
        const refreshToken = await utils.generateRefreshToken();

        return { bearerToken, refreshToken };
    } catch (error) {
        throw new Error(error.message);
    }
};

const signin = async (email, phoneNumber, password) => {
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

    return {
        bearerToken: utils.generateBearerToken(user.id),
        refreshToken: await utils.generateRefreshToken()
    };
}

export default {
    signup,
    signin
};
