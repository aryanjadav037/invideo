import React from 'react';

const QuickActions = ({ quickActions }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {quickActions.map((action, index) => (
        <button
          key={index}
          className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-3 text-sm transition-colors"
          onClick={() => alert(`${action.label} generation would use a different API endpoint`)}
        >
          {action.icon} {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
