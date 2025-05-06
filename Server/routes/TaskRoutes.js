// server/routes/taskRoutes.js
const express = require('express');
const taskController = require('../controllers/TaskController'); // Import task controller

const router = express.Router();

// Task routes
router.post('/tasks', taskController.createTask); // Create a task
router.get('/tasks', taskController.getTasks); // Get all tasks
router.put('/tasks/:id', taskController.updateTask); // Update a task
router.delete('/tasks/:id', taskController.deleteTask); // Delete a task

module.exports = router;
