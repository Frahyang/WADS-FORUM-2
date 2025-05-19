import React, { useState } from 'react';
import axios from '../api/axios';
import './AddTask.css';

export default function EditTask({ currentTask, onClose, refreshTasks }) {
  const [title, setTitle] = useState(currentTask.title);
  const [description, setDescription] = useState(currentTask.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === '' || description.trim() === '') {
      setError("Title and description cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.put(`/tasks/${currentTask.id}`, {
        title,
        description
      });

      refreshTasks(); // Re-fetch tasks from backend
      onClose();
    } catch (err) {
      console.error("Error updating task:", err.message);
      setError("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            className='form-title'
            type="text"
            placeholder='Enter Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className='form-description'
            placeholder='Enter Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
