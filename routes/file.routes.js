import express from 'express';

import fileController from '../controllers/file.controller.js';

import isAuth from "../middlewares/isAuth.js";


const fileRouter = express.Router();

fileRouter.post('/upload', isAuth, fileController.uploadFile);

fileRouter.get('/list', isAuth, fileController.getFileList);

// Delete file - Delete a document from the database and local storage
fileRouter.delete('/delete/:id', (req, res) => {
    // Handle file deletion logic
});

// Get file info - Get information about a specific file
fileRouter.get('/:id', (req, res) => {
    // Handle file information retrieval logic
});

// Download file - Download a specific file
fileRouter.get('/download/:id', (req, res) => {
    // Handle file download logic
});

// Update file - Update the current document to a new one in the database and local storage
fileRouter.put('/update/:id', (req, res) => {
    // Handle file update logic
});

export default fileRouter;
