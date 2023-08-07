import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';

const priorityColors = {
  mostImportant: 'red',
  important: 'orange',
  leastImportant: 'green',
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
          setTasks([
            ...tasks,
            {
              text: inputValue,
              timestamp: getCurrentTimestamp(),
              priority: 'leastImportant',
              completed: false,
            },
          ]);
        } else {
          const updatedTasks = [...tasks];
          updatedTasks[editIndex] = {
            text: inputValue,
            timestamp: getCurrentTimestamp(),
            priority: updatedTasks[editIndex].priority,
            completed: updatedTasks[editIndex].completed,
            completedTimestamp: updatedTasks[editIndex].completed
              ? getCurrentTimestamp()
              : null,
          };
          setTasks(updatedTasks);
          setEditIndex(-1);
        }
        setInputValue('');
      }
    } else {
      alert('You can add up to 12 items at a time.');
    }
  };

  const handleEditTask = (index) => {
    setInputValue(tasks[index].text);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setEditIndex(-1);
  };

  const handlePriorityChange = (index, newPriority) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].priority = newPriority;
    setTasks(updatedTasks);
  };

  const handleToggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    updatedTasks[index].completedTimestamp = updatedTasks[index].completed
      ? getCurrentTimestamp()
      : null;
    setTasks(updatedTasks);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignup = (userData) => {
    console.log('New user data', userData);
    setLoggedIn(false);
    setShowSignup(false);
  };

  return (
    <div className="App">
      {loggedIn ? (
        <>
          <h1>Todo List</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter your task..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              style={{ background: 'black', color: 'white' }}
              onClick={handleAddTask}
            >
              {editIndex === -1 ? 'Add Task' : 'Update Task'}
            </button>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(index)}
                  />
                  <span
                    style={{
                      color: priorityColors[task.priority],
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                  >
                    {task.text}
                  </span>
                  <span className="timestamp">Added on: {task.timestamp}</span>
                  {task.completed && (
                    <span className="timestamp">
                      Completed on: {task.completedTimestamp}
                    </span>
                  )}
                </div>
                <button
                  style={{ background: 'black', color: 'white' }}
                  onClick={() => handleEditTask(index)}
                >
                  Edit
                </button>
                <button
                  style={{ background: 'black', color: 'white' }}
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
                <select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(index, e.target.value)}
                >
                  <option value="mostImportant">Most Important</option>
                  <option value="important">Important</option>
                  <option value="leastImportant">Least Important</option>
                </select>
              </li>
            ))}
          </ul>
        </>
      ) : showSignup ? (
        <Signup onSignup={handleSignup} />
      ) : (
        <Login onLogin={handleLogin} onShowSignup={() => setShowSignup(true)} />
      )}
    </div>
  );
}

export default App;
