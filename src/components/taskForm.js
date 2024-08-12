import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, taskToEdit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      onSubmit({ name, description });
    } else {
      alert("Both fields are required.");
    }
  };

  return (
    <div className='form-div'>
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
      />
      <textarea
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
      {taskToEdit && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
    </div>
  );
};

export default TaskForm;
