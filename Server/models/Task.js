// server/models/task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import sequelize instance

// Define the Task model
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  isChecked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER, // Assuming a task belongs to a user (foreign key)
    allowNull: false,
  },
});

module.exports = Task;
