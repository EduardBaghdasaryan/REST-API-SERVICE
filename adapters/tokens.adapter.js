import db from '../models/index.model.js';

const TokenModel = db.tokens;

const invalidateToken = async (id) => {
    try {
        await TokenModel.update({ isActive: false }, { where: { id } });
    } catch (error) {
        throw new Error(error)
    }
};

const createToken = async (id, token) => {
    try {
        const newToken = await TokenModel.create({
            id,
            token,
            isActive: true
        });
        return newToken;
    } catch (error) {
        throw new Error('Failed to create token');
    }
};

export default {
    invalidateToken,
    createToken
};