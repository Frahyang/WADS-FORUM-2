// server/controllers/taskController.js
const Task = require('../models/Task'); // Import Task model

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, isChecked, userId } = req.body;

  try {
    const newTask = await Task.create({ title, description, isChecked, userId });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, isChecked } = req.body;

  try {
    const task = await Task.findByPk(taskId);

    if (task) {
      task.title = title;
      task.description = description;
      task.isChecked = isChecked;

      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (task) {
      await task.destroy();
      res.status(200).json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
