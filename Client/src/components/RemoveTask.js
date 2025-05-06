import React from 'react';
import axios from '../api/axios'; // Ensure path is correct

export default function RemoveTask({ tasks, setTasks, showDeleteIcons, setShowDeleteIcons }) {
  const handleDeleteTask = async (taskId) => {
    try {
      // Send the delete request to the backend
      await axios.delete(`/tasks/${taskId}`);
      
      // If deletion is successful, remove the task locally
      setTasks(tasks.filter((task) => task.id !== taskId));
      console.log("Task deleted locally!");
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const toggleRemoveTask = () => {
    setShowDeleteIcons(!showDeleteIcons);
  };

  return { handleDeleteTask, toggleRemoveTask };
}
