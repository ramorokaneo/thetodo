import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { toggleTodo } from '../redux/reducers/todoReducer'; // Import toggleTodo action

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  const handleToggle = (id) => {
    dispatch(toggleTodo(id)); // Dispatch the toggleTodo action with the todo ID
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)} // Call the handleToggle function when toggling
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
