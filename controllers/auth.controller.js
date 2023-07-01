import authService from '../services/auth.service.js';

const signup = async (req, res, next) => {
    try {
        const { email, password, phoneNumber } = req.body;

        if (!email && !phoneNumber) {
            throw new Error('Email or phoneNumber is required');
        }

        if (email && phoneNumber) {
            throw new Error('Only one of email or phoneNumber should be provided');
        }

        const identifier = email ? email : phoneNumber;
        const { bearerToken, refreshToken } = await authService.signup(identifier, password);
        res.json({ bearerToken, refreshToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export default {
    signup,
};