import React from 'react';

/**
 * A simple loading bar component.
 */
function LoadingBar() {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-[100]">
      {/* Simple CSS Spinner */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingBar; 