import React from 'react';
import TaskItem from './taskItem';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
