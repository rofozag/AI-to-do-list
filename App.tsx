import React, { useState, useCallback } from 'react';
import { Task } from './types';
import { generateTasksWithGemini } from './services/geminiService';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Loader from './components/Loader';
import ConfirmationDialog from './components/ConfirmationDialog';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleGenerateTasks = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const generatedTasks = await generateTasksWithGemini(prompt);
      const newTasks: Task[] = generatedTasks.map((task) => ({
        id: crypto.randomUUID(),
        text: task.text,
        completed: false,
        dueDate: task.dueDate
      }));
      setTasks((prevTasks) => [...prevTasks, ...newTasks]);
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const addTask = (text: string, dueDate: string | null) => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      dueDate
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const requestDeleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTaskToDelete(task);
    }
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      setTaskToDelete(null);
    }
  };

  const cancelDeleteTask = () => {
    setTaskToDelete(null);
  };

  const updateTask = (id: string, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 p-4 sm:p-6 md:p-8">
      <div 
        className="max-w-2xl mx-auto bg-slate-800/50 rounded-2xl shadow-2xl shadow-cyan-500/10 border border-slate-700 backdrop-blur-sm"
      >
        <Header />
        <main className="p-6 md:p-8">
          <TaskInput
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerateTasks}
            onAddTask={addTask}
            isLoading={isLoading}
          />
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg my-4 text-center">
              <p><strong>Error:</strong> {error}</p>
              <p className="text-sm mt-1">Please check your API key and try again.</p>
            </div>
          )}

          <div className="mt-6">
            {isLoading && tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Loader />
                <p className="text-cyan-400 animate-pulse">Generating your tasks...</p>
              </div>
            ) : (
              <TaskList 
                tasks={tasks} 
                onToggle={toggleTask} 
                onDelete={requestDeleteTask} 
                onUpdate={updateTask}
              />
            )}
          </div>
          
          {tasks.length > 0 && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={clearTasks}
                className="text-sm text-slate-400 hover:text-red-400 transition-colors duration-300"
              >
                Clear all tasks
              </button>
            </div>
          )}
        </main>
      </div>
       <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>Powered by Gemini AI</p>
      </footer>

      <ConfirmationDialog
        isOpen={!!taskToDelete}
        onConfirm={confirmDeleteTask}
        onCancel={cancelDeleteTask}
        taskText={taskToDelete?.text || ''}
      />
    </div>
  );
};

export default App;