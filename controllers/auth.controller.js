import authService from '../services/auth.service.js';

const signup = async (req, res, next) => {
    try {
        const { email, password, phoneNumber } = req.body;

        if (!email && !phoneNumber) {
            throw new Error('Email or phoneNumber is required');
        }

        const identifier = { email, phoneNumber };
        const { bearerToken, refreshToken } = await authService.signup(identifier, password);
        res.json({ bearerToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: 'Failed to sign up: ' + error.message });
    }
};

const signin = async (req, res, next) => {
    try {
        const { email, phoneNumber, password } = req.body;
        if (!email && !phoneNumber) {
            throw new Error('Please provide an email or phone number');
        }

        const tokens = await authService.signin(email, phoneNumber, password);
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ error: 'Failed to sign in: ' + error.message });
    }
};

const refreshBearerToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const { bearerToken } = await authService.refreshBearerToken(refreshToken);
        res.json({ bearerToken });
    } catch (error) {
        res.status(500).json({ error: 'Failed to refresh bearer token: ' + error.message });
    }
};

export default {
    signup,
    signin,
    refreshBearerToken
};