import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/reducers/todoReducer';

const TodoForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
