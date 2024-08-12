import React, { useState, useEffect } from 'react';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const isDuplicate = tasks.some(t => t.name === task.name);

    if (isDuplicate) {
      alert("Task with this name already exists.");
      return;
    }

    setTasks([...tasks, { ...task, id: uuidv4(), completed: false }]);
    setTaskToEdit(null);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    ));
    setTaskToEdit(null);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm
        onSubmit={taskToEdit ? (task) => updateTask({ ...task, id: taskToEdit.id }) : addTask}
        taskToEdit={taskToEdit}
        onCancel={() => setTaskToEdit(null)}
      />
      <TaskList
        tasks={tasks}
        onEdit={(task) => setTaskToEdit(task)}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;
