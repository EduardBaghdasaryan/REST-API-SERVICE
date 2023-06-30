import express from 'express';

const userRoutes = express.Router();

// Get user info - Get the id of the user
userRoutes.get('/info', (req, res) => {
    // Handle user information retrieval logic
});

// Logout - Logout from the system
userRoutes.get('/logout', (req, res) => {
    // Handle logout logic
});

export default userRoutes;
