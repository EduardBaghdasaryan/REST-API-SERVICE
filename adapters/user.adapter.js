import db from '../models/index.model.js';

const UsersModel = db.users;


const signup = async (email, phoneNumber, hashedPassword) => {
    try {
        if (!email && !phoneNumber) {
            throw new Error('Email or phoneNumber is required');
        }

        const userData = {
            password: hashedPassword
        };

        if (email) {
            userData.email = email;
        }

        if (phoneNumber) {
            userData.phoneNumber = phoneNumber;
        }

        console.log(userData);

        return await UsersModel.create(userData);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const findUserByEmail = async (email) => {
    try {
        return await UsersModel.findOne({ where: { email } });
    } catch (error) {
        throw new Error(error.message);
    }
};

const findUserByPhoneNumber = async (phoneNumber) => {
    try {
        return await UsersModel.findOne({ where: { phoneNumber } });
    } catch (error) {
        throw new Error(error.message);
    }
};

const findUserById = async (userId) => {
    try {
        return await UsersModel.findOne({ id: userId });

    } catch (error) {
        throw new Error(error);
    }
};

export default {
    signup,
    findUserByEmail,
    findUserByPhoneNumber,
    findUserById
}