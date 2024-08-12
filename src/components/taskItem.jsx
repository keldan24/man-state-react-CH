import React from 'react';
import { useEffect, useState } from 'react';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(task.completed);
    }, [task.completed]);

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onToggleComplete(task.id);
    };

    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span onClick={() => onToggleComplete(task.id)}>
                {task.name} - {task.description}
            </span>
            <div className='actionButtons'>
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
                <div className={`completeSec ${isChecked ? 'checked' : ''}`} onClick={handleCheckboxChange}>
                    Done
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                </div>
            </div>
        </li>
    );
};

export default TaskItem;
