import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // Ensure path is correct
import defaultProfilePic from '../assets/defaultProfilePic.jpg';
import './NavBar.css';

export default function NavBar({ onAddTask, onRemoveTask, onLogout, onSearch, onFilterChange }) {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(defaultProfilePic);
  const [username, setUsername] = useState("User");
  const [showPopup, setShowPopup] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("All");

  useEffect(() => {
    // Check if user is logged in and load user data from the backend
    const loadUserData = async () => {
      try {
        const response = await axios.get('/users/profile');
        setUsername(response.data.username);
        setProfilePicture(response.data.profilePicture || defaultProfilePic);
      } catch (err) {
        console.error("Failed to load user data:", err);
        navigate('/login'); // Redirect to login if fetching profile fails
      }
    };

    loadUserData();
  }, [navigate]);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    setShowPopup(!showPopup);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setNewProfilePicture(file);
      setUploadError("");
    } else {
      setUploadError("Please select a valid image file.");
    }
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    if (newUsername) formData.append('username', newUsername);
    if (newProfilePicture) formData.append('profilePicture', newProfilePicture);

    try {
      const response = await axios.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUsername(response.data.username);
      setProfilePicture(response.data.profilePicture || defaultProfilePic);
      setShowPopup(false);
      setNewUsername("");
      setNewProfilePicture(null);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setUploadError("Failed to update profile.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterClick = (filterType) => {
    setCurrentFilter(filterType);
    onFilterChange(filterType);
  };

  return (
    <div>
      <div className='greetings'>
        <h1>Hello, {username}</h1>
      </div>
      <div className='container'>
        <div className='navbar-container'>
          <div className='add-task'>
            <button onClick={onAddTask}>Add Task</button>
          </div>
          <div className='remove-task'>
            <button onClick={onRemoveTask}>Remove Task</button>
          </div>
          <div className='log-out'>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
        <div className='profile-container'>
          <img 
            className='profile' 
            src={profilePicture} 
            alt='pfp' 
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <div className='search-container'>
        <div className='search-bar-container'>
          <input 
            className='search-bar'
            type="text" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={handleSearchChange}>  
          </input>
        </div>
        <div className='filter'>
          <button onClick={() => handleFilterClick("All")} className={currentFilter === "All" ? 'active-filter' : ''}>All</button>
        </div>
        <div className='filter'>
          <button onClick={() => handleFilterClick("Ticked")} className={currentFilter === "Ticked" ? 'active-filter' : ''}>Ticked</button>
        </div>
        <div className='filter'>
          <button onClick={() => handleFilterClick("Unticked")} className={currentFilter === "Unticked" ? 'active-filter' : ''}>Unticked</button>
        </div>
      </div>

      {showPopup && (
        <div className='profile-popup-container'>
          <div className="profile-popup">
            <h2>Edit Profile</h2>
            <input 
              type="text" 
              placeholder="New Username" 
              value={newUsername} 
              onChange={handleUsernameChange} 
            />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleProfilePictureChange} 
            />
            {uploadError && <div style={{ color: "red" }}>{uploadError}</div>}
            <button onClick={handleSaveProfile}>Save Changes</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
