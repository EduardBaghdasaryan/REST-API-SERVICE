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
        return await TokenModel.create({
            id,
            token,
            isActive: true
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create token');
    }
};

const updateToken = async (id, token) => {
    try {
        return await TokenModel.update(
            { token, isActive: true },
            { where: { id } }
        );
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update token');
    }
}
export default {
    invalidateToken,
    createToken,
    updateToken
};