import React from 'react';

/**
 * A simple loading bar component.
 */
function LoadingBar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[9999]">
      {/* You can add animation here using CSS or a library */}
      <div className="h-full bg-blue-300 animate-pulse"></div>
    </div>
  );
}

export default LoadingBar; 