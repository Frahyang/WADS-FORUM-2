// server/db.js
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance to connect to an SQLite database file
// If the file doesn't exist, it will be created
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // The file will be stored in the current directory
});

module.exports = sequelize;
