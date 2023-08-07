import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    // Fetch tasks data from JSON Server API
    axios.get(`${API_BASE_URL}/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const handleAddTask = () => {
    if (tasks.length < 12) {
      if (inputValue.trim() !== '') {
        if (editIndex === -1) {
          // Create a new task
          axios.post(`${API_BASE_URL}/tasks`, {
            text: inputValue,
            timestamp: getCurrentTimestamp(),
            priority: 'leastImportant',
            completed: false,
            completedTimestamp: null,
          })
          .then((response) => {
            setTasks([...tasks, response.data]);
            setInputValue('');
          })
          .catch((error) => {
            console.error('Error adding task:', error);
          });
        } else {
          // Update an existing task
          const taskToUpdate = tasks[editIndex];
          axios.put(`${API_BASE_URL}/tasks/${taskToUpdate.id}`, {
            ...taskToUpdate,
            text: inputValue,
            timestamp: getCurrentTimestamp(),
          })
          .then((response) => {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = response.data;
            setTasks(updatedTasks);
            setEditIndex(-1);
            setInputValue('');
          })
          .catch((error) => {
            console.error('Error updating task:', error);
          });
        }
      }
    } else {
      alert('You can add up to 12 items at a time.');
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setInputValue(taskToEdit.text);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const taskToDelete = tasks[index];
    axios.delete(`${API_BASE_URL}/tasks/${taskToDelete.id}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
        setTasks(updatedTasks);
        setEditIndex(-1);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your task..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTask}>
          {editIndex === -1 ? 'Add Task' : 'Update Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={task.id}>
            <span>{task.text}</span>
            {/* Display other task properties */}
            <button onClick={() => handleEditTask(index)}>Edit</button>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
