import db from '../models/index.model.js';

const UsersModel = db.users;


const emailSignup = async (email, hashedPassword) => {
    try {
        return await UsersModel.create({ email, password: hashedPassword });
    } catch (error) {
        throw new Error(error)
    }
}

const phoneNumberSignup = async (phoneNumber, hashedPassword) => {
    try {
        return await UsersModel.create({ phoneNumber, password: hashedPassword });
    } catch (error) {
        throw new Error(error)
    }
}

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

export default {
    emailSignup,
    phoneNumberSignup,
    findUserByEmail,
    findUserByPhoneNumber
}