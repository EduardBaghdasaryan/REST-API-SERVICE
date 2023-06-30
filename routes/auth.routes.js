import express from 'express';

import authController from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);

authRouter.post('/signin',);

authRouter.post('/signin/new_token', (req, res) => {
    // Handle refresh token logic
});

export default authRouter;