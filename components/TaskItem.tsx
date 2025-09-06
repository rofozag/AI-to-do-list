import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
}

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task.id, editText.trim());
    } else {
      setEditText(task.text); // Revert if input is empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = task.dueDate ? new Date(task.dueDate.replace(/-/g, '/')) : null;
  if(dueDate) {
    dueDate.setHours(0,0,0,0);
  }

  const isOverdue = dueDate && !task.completed && dueDate < today;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString.replace(/-/g, '/'));
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    if (date.getFullYear() !== now.getFullYear()) {
      options.year = 'numeric';
    }
    return date.toLocaleDateString('en-US', options);
  };
  
  return (
    <li className="flex items-center gap-3 p-3 bg-slate-900/70 rounded-lg border border-slate-700/50 hover:bg-slate-800/80 transition-all duration-300 group">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="
          flex-shrink-0 w-5 h-5 text-cyan-500 bg-slate-700 border-slate-600 rounded 
          focus:ring-cyan-600 focus:ring-offset-slate-900 focus:ring-2 
          cursor-pointer
        "
      />
      <div className="flex-grow">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-slate-700/80 border border-cyan-500 rounded px-2 py-1 text-slate-100 outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        ) : (
          <span
            onClick={() => !task.completed && setIsEditing(true)}
            className={`text-slate-300 transition-colors duration-300 ${
              task.completed ? 'line-through text-slate-500' : 'cursor-pointer hover:text-cyan-300'
            }`}
          >
            {task.text}
          </span>
        )}
        {task.dueDate && (
          <p className={`text-xs mt-1 flex items-center gap-1.5 ${
              isOverdue ? 'text-red-400 font-medium' : 'text-slate-400'
          }`}>
             <CalendarIcon className="w-3.5 h-3.5" />
             <span>{formatDate(task.dueDate)}</span>
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="ml-auto text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none focus:text-red-500"
        aria-label={`Delete task: ${task.text}`}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
};

export default TaskItem;