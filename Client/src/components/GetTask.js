import axios from '../api/axios';

export const fetchTasks = async () => {
  try {
    const response = await axios.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    return [];
  }
};
