// server/server.js
const express = require('express');
const sequelize = require('./db'); // Import sequelize instance
const taskRoutes = require('./routes/TaskRoutes'); // Import task routes
const userRoutes = require('./routes/UserRoutes'); // Import user routes
const cors = require('cors'); // To allow requests from frontend (if needed)

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Enable CORS

// Use routes
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

// Sync database (if it hasn't been created yet)
(async () => {
  try {
    await sequelize.sync(); // Sync Sequelize models with the database
    console.log('Database synced!');
  } catch (error) {
    console.error('Database sync error:', error);
  }
})();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
