
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
