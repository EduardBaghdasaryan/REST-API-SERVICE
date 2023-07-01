
import userService from '../services/user.service.js';

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

export default {
    getUserId,
};