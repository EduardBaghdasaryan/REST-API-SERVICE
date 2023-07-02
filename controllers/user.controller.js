
import userService from '../services/user.service.js';
import utils from '../utils/utils.js';

const getUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, phoneNumber } = await userService.getUserId(id);
        res.json({ email, phoneNumber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve user ID' });
    }
};


const logout = async (req, res) => {
    try {
        console.log(1111111111111);
        const { id } = req.user;

        await userService.invalidateToken(id);

        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Failed to logout' });
    }
};

export default {
    getUserId,
    logout
};