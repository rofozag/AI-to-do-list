import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  taskText: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel, taskText }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      aria-labelledby="confirmation-title"
      role="alertdialog"
      aria-modal="true"
    >
      <div 
        className="bg-slate-800 rounded-xl shadow-2xl shadow-black/30 border border-slate-700 w-full max-w-md p-6 animate-fade-in"
        role="document"
      >
        <h2 id="confirmation-title" className="text-xl font-bold text-slate-100">
          Confirm Deletion
        </h2>
        <p className="mt-3 text-slate-400">
          Are you sure you want to delete the task: "{taskText}"? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-600 text-slate-100 font-semibold rounded-lg hover:bg-slate-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
