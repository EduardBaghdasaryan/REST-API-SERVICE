import express from 'express';

import authController from '../controllers/auth.controller.js';
import validateSignupData from '../middlewares/validators.js';

const authRouter = express.Router();

authRouter.post('/signup', validateSignupData, authController.signup);

authRouter.post('/signin', validateSignupData, authController.signin);

authRouter.post('/signin/new_token', authController.refreshBearerToken);


export default authRouter;
