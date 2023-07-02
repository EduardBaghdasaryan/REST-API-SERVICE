import db from '../models/index.model.js';

const TokenModel = db.tokens;

const invalidateToken = async (id) => {
    try {
        await TokenModel.destroy({ where: { id } });
    } catch (error) {
        throw new Error(error)
    }
};

const createToken = async (id, token) => {
    try {
        return await TokenModel.create({
            id,
            token,
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create token');
    }
};


export default {
    invalidateToken,
    createToken,
};