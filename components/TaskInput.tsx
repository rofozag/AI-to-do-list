import React, { useState } from 'react';

interface TaskInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  onAddTask: (text: string, dueDate: string | null) => void;
  isLoading: boolean;
}

const GenerateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M15.312 5.312a.75.75 0 010 1.06L8.836 12.858a.75.75 0 01-1.06 0L4.688 9.762a.75.75 0 111.06-1.06l2.564 2.564 5.926-5.926a.75.75 0 011.06 0z"
      clipRule="evenodd"
    />
    <path d="M17.857 5.312a.75.75 0 01.75.75v8.188a.75.75 0 01-1.5 0V6.062a.75.75 0 01.75-.75z" />
    <path d="M14.286 1.75a.75.75 0 00-1.06 0l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06a.75.75 0 000-1.06z" />
    <path d="M12.121 2.812a.75.75 0 011.06 1.06l-1.06 1.061a.75.75 0 01-1.06-1.06L12.12 2.812z" />
  </svg>
);


const TaskInput: React.FC<TaskInputProps> = ({ prompt, setPrompt, onGenerate, onAddTask, isLoading }) => {
  const [manualTask, setManualTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleManualAdd = () => {
    onAddTask(manualTask, dueDate || null);
    setManualTask('');
    setDueDate('');
  };

  const handleManualKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleManualAdd();
    }
  };

  const handleGenerateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onGenerate();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="ai-prompt" className="text-sm font-medium text-slate-300 mb-2 block">
          Enter a goal and let AI generate your tasks
        </label>
        <div className="flex gap-2">
          <input
            id="ai-prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleGenerateKeyDown}
            placeholder="e.g., Plan a weekend trip to the mountains"
            className="flex-grow bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition duration-200 text-slate-100 placeholder-slate-400"
            disabled={isLoading}
          />
          <button
            onClick={onGenerate}
            disabled={isLoading || !prompt.trim()}
            className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-md shadow-cyan-500/20 disabled:shadow-none flex items-center gap-2"
          >
            <GenerateIcon className="w-5 h-5" />
            <span>{isLoading ? 'Generating...' : 'Generate'}</span>
          </button>
        </div>
      </div>

      <div className="relative flex items-center">
        <div className="flex-grow border-t border-slate-700"></div>
        <span className="flex-shrink mx-4 text-slate-500 text-xs">OR</span>
        <div className="flex-grow border-t border-slate-700"></div>
      </div>
      
      <div>
        <label htmlFor="manual-task" className="text-sm font-medium text-slate-300 mb-2 block">
          Add a single task manually
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="manual-task"
            type="text"
            value={manualTask}
            onChange={(e) => setManualTask(e.target.value)}
            onKeyDown={handleManualKeyDown}
            placeholder="e.g., Buy groceries"
            className="flex-grow bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 text-slate-100 placeholder-slate-500"
            disabled={isLoading}
          />
          <input
            type="date"
            aria-label="Due date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 text-slate-100 placeholder-slate-500"
            style={{ colorScheme: 'dark' }}
          />
          <button
            onClick={handleManualAdd}
            disabled={!manualTask.trim()}
            className="flex-shrink-0 bg-slate-600 text-slate-100 font-semibold px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-500 transition-colors duration-300"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
