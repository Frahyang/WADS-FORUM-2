import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import Task from './components/Task';
import AddTask from './components/AddTask';
import RemoveTask from './components/RemoveTask';
import EditTask from './components/EditTask';
import Login from './components/Login';
import SignUp from './components/SignUp';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDeleteIcons, setShowDeleteIcons] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    applyFilter();
  }, [tasks, searchTerm, filter]);

  const handleAddTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now().toString(),
      isChecked: false
    };
    setTasks([...tasks, taskWithId]);
    setShowAddTask(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  const handleSaveTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskToEdit.id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    setTaskToEdit(null);
  };

  const applyFilter = () => {
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === 'Ticked') {
      filtered = filtered.filter((task) => task.isChecked === true);
    } else if (filter === 'Unticked') {
      filtered = filtered.filter((task) => !task.isChecked);
    }

    setFilteredTasks(filtered);
  };

  const handleLogout = () => {
    setTasks([]);
  };

  return (
    <Routes>
      <Route path="/signup" element={<SignUp onLogin={() => setIsLoggedIn(true)} />} />
      <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
      <Route
        path="/todolist"
        element={
          isLoggedIn ? (
            <div className="App">
              <NavBar
                onAddTask={() => setShowAddTask(true)}
                onRemoveTask={() => setShowDeleteIcons(!showDeleteIcons)}
                onLogout={handleLogout}
                onSearch={setSearchTerm}
                onFilterChange={setFilter}
              />

              {showAddTask && (
                <AddTask
                  onClose={() => setShowAddTask(false)}
                  onAddTask={handleAddTask}
                />
              )}

              <div className='task-list'>
                {filteredTasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onDelete={() => handleDeleteTask(task.id)}
                    showDeleteIcons={showDeleteIcons}
                    onEdit={handleEditTask}
                  />
                ))}
              </div>

              {taskToEdit && (
                <EditTask
                  currentTask={taskToEdit}
                  onSave={handleSaveTask}
                  onClose={() => setTaskToEdit(null)}
                />
              )}
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}
