import authService from '../services/auth.service.js';

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { bearerToken, refreshToken } = await authService.signup(email, password);
        res.json({ bearerToken, refreshToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

export default {
    signup,
};