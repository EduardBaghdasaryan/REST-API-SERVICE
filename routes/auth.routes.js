import express from 'express';

const authRouter = express.Router();

// Signin - Request bearer token by id and password
authRouter.post('/signin', (req, res) => {
    // Handle signin logic
});

// Refresh token - Request new bearer token using refresh token
authRouter.post('/signin/new_token', (req, res) => {
    // Handle refresh token logic
});

// Signup - Register a new user
authRouter.post('/signup', (req, res) => {
    // Handle signup logic
});

export default authRouter;