import React, { useState } from 'react';
import axios from '../api/axios';
import './AddTask.css';

export default function AddTask({ onClose, refreshTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = { 
      title, 
      description
    };

    try {
      await axios.post('/tasks', newTask); // Send to backend
      refreshTasks(); // Re-fetch tasks from backend after adding
      setTitle('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className='overlay'>
      <div className='popup'>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            className='form-title'
            type='text'
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
          <button className='submitting-task' type='submit'>Submit</button>
          <button className='submitting-task' type='button' onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
