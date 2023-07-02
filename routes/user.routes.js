import express from 'express';
import userController from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';

const userRouter = express.Router();

userRouter.get('/info/:id', isAuth, userController.getUserId);
userRouter.get('/logout', isAuth, userController.logout);

export default userRouter;
