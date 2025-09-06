
import React from 'react';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M9 4.5a.75.75 0 01.75.75V9h3.75a.75.75 0 010 1.5H9.75v3.75a.75.75 0 01-1.5 0V10.5H4.5a.75.75 0 010-1.5H8.25V5.25A.75.75 0 019 4.5z"
      clipRule="evenodd"
    />
    <path d="M14.25 10.5a.75.75 0 000 1.5h3.018a.75.75 0 000-1.5H14.25z" />
    <path
      fillRule="evenodd"
      d="M10.5 15.75a.75.75 0 01.75.75V21h3.75a.75.75 0 010 1.5h-3.75v3.75a.75.75 0 01-1.5 0v-3.75H6a.75.75 0 010-1.5h3.75v-3.75a.75.75 0 01.75-.75zM15 15.75a.75.75 0 000 1.5h3.018a.75.75 0 000-1.5H15z"
      clipRule="evenodd"
    />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="p-6 md:p-8 border-b border-slate-700">
      <div className="flex items-center gap-4">
         <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <SparkleIcon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-50">AI To-Do List</h1>
          <p className="text-sm text-slate-400">Let Gemini plan your next goal.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
