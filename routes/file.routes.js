import express from 'express';

import fileController from '../controllers/file.controller.js';

import isAuth from '../middlewares/isAuth.js';

const fileRouter = express.Router();

fileRouter.post('/upload', isAuth, fileController.uploadFile);

fileRouter.get('/list', isAuth, fileController.getFileList);

fileRouter.delete('/delete/:id', fileController.deleteFile);

fileRouter.get('/:id', fileController.getFileById);

fileRouter.get('/download/:id', fileController.downloadFileById);

fileRouter.put('/update/:id', fileController.updateFileById);

export default fileRouter;
