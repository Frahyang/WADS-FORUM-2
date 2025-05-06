import React, { useState, useEffect } from 'react';
import './Task.css';

export default function Task({ task, onDelete, showDeleteIcons, onEdit, onCheckboxChange }) {
  const [isChecked, setIsChecked] = useState(task.isChecked || false);

  useEffect(() => {
    // Update the parent component's state if isChecked changes locally
    onCheckboxChange(task.id, isChecked);
  }, [isChecked, task.id, onCheckboxChange]);

  const handleCheckboxChange = (e) => {
    const newCheckedState = e.target.checked;
    setIsChecked(newCheckedState);

    // Log the local checkbox state (this can be removed for production)
    console.log(`Checkbox for task "${task.title}" is now:`, newCheckedState);
  };

  return (
    <div className={`task-container ${isChecked ? 'checked' : ''}`}>
      <div className='text-container'>
        <label className="check-box">
          <input 
            type='checkbox' 
            checked={isChecked} 
            onChange={handleCheckboxChange} 
          />
          <span className="checkmark"></span>
        </label>
        <div className='title'>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      </div>
      <div className='edit-delete'>
        <div className='edit'>
          <button onClick={() => onEdit(task)}>Edit</button>
        </div>
        <div className={`delete ${showDeleteIcons ? 'show' : ''}`}>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
