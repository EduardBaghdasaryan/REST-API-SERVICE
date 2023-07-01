import express from 'express';

import fileController from '../controllers/file.controller.js';

import isAuth from "../middlewares/isAuth.js";


const fileRouter = express.Router();

fileRouter.post('/upload', isAuth, fileController.uploadFile);

fileRouter.get('/list', isAuth, fileController.getFileList);

fileRouter.delete('/delete/:id', fileController.deleteFile);

fileRouter.get('/:id', fileController.getFileById);

fileRouter.get('/download/:id', fileController.downloadFileById);

// Update file - Update the current document to a new one in the database and local storage
fileRouter.put('/update/:id', (req, res) => {
    // Handle file update logic
});

export default fileRouter;
