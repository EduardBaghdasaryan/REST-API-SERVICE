import db from '../models/index.model.js';

const UsersModel = db.users;

const signup = async (email, phoneNumber, hashedPassword) => {
  if (!email && !phoneNumber) {
    throw new Error('Email or phoneNumber is required');
  }

  const userData = {
    password: hashedPassword,
    ...(email && { email }),
    ...(phoneNumber && { phoneNumber }),
  };

  try {
    return await UsersModel.create(userData);
  } catch (error) {
    throw new Error(error);
  }
};

const findUserByEmail = async email => {
  try {
    return await UsersModel.findOne({ where: { email } });
  } catch (error) {
    throw new Error(error);
  }
};

const findUserByPhoneNumber = async phoneNumber => {
  try {
    return await UsersModel.findOne({ where: { phoneNumber } });
  } catch (error) {
    throw new Error(error);
  }
};

const findUserById = async id => {
  try {
    return await UsersModel.findOne({ where: { id } });
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  signup,
  findUserByEmail,
  findUserByPhoneNumber,
  findUserById,
};
