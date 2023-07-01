import userAdapter from '../adapters/user.adapter.js';

const getUserId = async (id) => {
    try {
        const userId = await userAdapter.findUserById(id);
        return userId;
    } catch (error) {
        throw new Error('Failed to retrieve user ID from the adapter');
    }
};

export default {
    getUserId,
};