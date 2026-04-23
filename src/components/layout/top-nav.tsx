import React from 'react';

export const TopNav = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold">S</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Solv</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Tickets
        </button>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Dashboard
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200" />
      </div>
    </nav>
  );
};
