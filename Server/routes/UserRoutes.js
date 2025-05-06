const express = require('express');
const userController = require('../controllers/UserController'); // Import user controller

const router = express.Router();

// User routes
router.post('/users', userController.createUser); // Create a user
router.get('/users', userController.getUsers); // Get all users
router.put('/users/:id', userController.updateUser); // Update a user
router.delete('/users/:id', userController.deleteUser); // Delete a user

// Authentication routes
router.post('/login', userController.loginUser); // Login a user (authenticate and send token)

module.exports = router;